import Number from '../models/Number.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import axios from 'axios'
import { google } from 'googleapis'
// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
//     lazyLoading: true
// });



const GSSD = async (req, res) => {


    const portedNumbers = await Number.countDocuments({ "ported": true })//({ "risk_level": 44 });
    const distinctLocalities = await Number.distinct('locality')
    const totalNumbersWithAddonsData = await Number.countDocuments({ "risk_level": { $exists: true }, "score": { $exists: true }, "ported": { $exists: true } });
    res.status(StatusCodes.OK).json({ portedNumbers, totalNumbers: totalNumbersWithAddonsData, localities: distinctLocalities.length })

}

const dataDrilling = async (req, res) => {
    const rawData = await Number.aggregate([
        {
            '$match': {
                'risk_level': 1,
                'score': 0,
                'ported': false
            }
        }, {
            '$group': {
                '_id': {
                    '$month': '$updatedAt'
                },
                'countOfFilteredNumbers': {
                    '$sum': 1
                }
            }
        }
    ]);
    const partialData = await Number.aggregate([
        {
            '$match': {
                'risk_level': {
                    '$exists': true
                },
                'score': {
                    '$exists': true
                },
                'ported': {
                    '$exists': true
                }
            }
        }, {
            '$group': {
                '_id': {
                    '$month': '$updatedAt'
                },
                'countOfTotalNumbers': {
                    '$sum': 1
                }
            }
        }
    ]);
    //below code is a taken from below reference link
    //https://stackoverflow.com/a/42206532/5588821
    var result = [...[rawData, partialData].reduce((m, a) => (a.forEach(o => m.has(o._id) && Object.assign(m.get(o._id), o) || m.set(o._id, o)), m), new Map).values()];


    res.status(StatusCodes.OK).json(
        {
            Status: "fullfilled",
            value: result,
        })

}


//Munif func do not delete
const murcury = async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://api.mercury.com/api/v1/accounts',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MURCURY_AUTH_TOKEN}`
        }
    };

    try {

        let { data } = await axios.request(options)
        data.accounts.forEach(async (item) => {
            if (item.nickname === "OpEx") {
                const transactionsoptions = {
                    method: 'GET',
                    url: `https://api.mercury.com/api/v1/account/${item.id}/transactions?limit=500&offset=01&start=2022-03-01&end=${new Date().toISOString()}`,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.MURCURY_AUTH_TOKEN}`
                    }
                }
                let { data } = await axios.request(transactionsoptions)

                let myArr = jsonArrayTo2D(data.transactions)
                myArr.forEach((item, index) => {
                    for (let i = 0; i <= item.length; i++) {
                        if (i == 11) {
                            myArr[index][i] = '';
                        }
                    }
                })
                sendtoGsheet(myArr)

                //console.log(myArr);
                res.status(StatusCodes.OK).json({ msg: 'ok' })
            }
        })


    } catch (error) {
        res.status(StatusCodes.OK).json(error);
    }



    async function sendtoGsheet(valArr) {
        //let myArr = jsonArrayTo2D(valArr)
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.KEY_FILE,
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        });
        const client = await auth.getClient();
        const googleSheets = google.sheets({
            version: "v4",
            auth: client
        });
        const spreadsheetId = "1337x5XnNE2AxEYEUBlJQFatqoHZay1tO09lFkaQErGg";

        try {

            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Transactions!A:Z",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: valArr,
                }
            });

        } catch (error) {

            console.log(error);

        }



    }

    function jsonArrayTo2D(arrayOfObjects) {
        let header = [],
            AoA = [];
        arrayOfObjects.forEach(obj => {
            Object.keys(obj).forEach(key => header.includes(key) || header.push(key))
            let thisRow = new Array(header.length);
            header.forEach((col, i) => thisRow[i] = obj[col] || '')
            AoA.push(thisRow);
        })
        AoA.unshift(header);
        return AoA;
    }



}

export { GSSD, dataDrilling, murcury }