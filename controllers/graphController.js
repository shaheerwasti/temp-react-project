import Number from '../models/Number.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'


// const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
//     lazyLoading: true
// });

const GSSD = async (req, res) => {


    const databaseNumber = await Number.countDocuments({ "risk_level": 1, "score": 0, "ported": false })//({ "risk_level": 44 });
    const totalNumbersRan = await Number.countDocuments({ "risk_level": { $exists: true }, "score": { $exists: true }, "ported": { $exists: true } });
    res.status(StatusCodes.OK).json({ "name": "Filter 1 : risk level = 1, score = 0, ported = false", numbersPassesFilter1: databaseNumber, totalNumbers: totalNumbersRan })

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

export { GSSD, dataDrilling }