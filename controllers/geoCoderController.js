'use strict'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import axios from 'axios'
//const Number = require('../models/CaseNumber')
import fs from 'fs'
import { readFile } from 'fs/promises';
import path from 'path'
// Importing a JSON file:
// import jsonData from '../utils/lists.json'

const ListOfAddresses = async (req, res) => {


    /* */const json = JSON.parse(await readFile(new URL('../utils/newList.json', import.meta.url)));

    //let { Info, caseNumber, date, DateFiled, listedOwners, nameOfDeceased, addressOfDeceased, cityOfDeceased, stateOfDeceased, zipCodeOfDeceased, County, addressStr, } = json.yourData

    //json

    let myObjs = json.GEOresults;

    // console.log(myObjs.length);

    res.status(StatusCodes.OK).send({
        data: myObjs,
        totalMarkers: myObjs.length
    })
    /*
    let BASE_URL = 'http://192.168.100.22:5000/api/v1/gsheet/tvr';

    let { spreadsheetId
        , range } = req.body
    //console.log(spreadsheetId);
    const options = {
        method: 'POST',
        url: BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // transformResponse: [function (data) {
        // Do whatever you want to transform the data
        //   const status = 'fulfilled';
        // data.msg.forEach( (item) => {
        //     //console.log()
        //     if (item.status === status) {
        //           return json({ status: 'fulfilled', ...JSON.parse(item.value) });
        //     }
        // })
        //return json({ status: 'not fulfilled', msg:"Please check the code or contact developer"} );
        // return data
        // }],
        data: {
            spreadsheetId, range
        }
    };


    let { data } = await axios.request(options)

    // arrToObject(data.values).map(({

    // }))

    let yourData = [];
    let geoCodeData = {};
    arrToObject(data.values).forEach(async (element) => {
        let { Info,
            "Case Number": caseNumber,
            Date,
            "Date Filed": dateFiled,
            "Listed Owners": listedOwners,
            "Name of Deceased": nameOfDeceased,
            "Address of Deceased": addressOfDeceased,
            "City of Deceased": cityOfDeceased,
            "State of Deceased": stateOfDeceased,
            "Zip Code of Deceased": zipCodeOfDeceased,
            County
        } = element;
        let date = dateParserlocalFunc(Date)
        let DateFiled = dateFiled.replace(/\//g, '-') + "T00:00:00Z"


        //console.log(date, DateFiled, caseNumber);

        let addressStr = addressOfDeceased + ', ' + cityOfDeceased + ', ' + stateOfDeceased + ', ' + zipCodeOfDeceased + ', ' + County;

        yourData.push({ Info, caseNumber, date, DateFiled, listedOwners, nameOfDeceased, addressOfDeceased, cityOfDeceased, stateOfDeceased, zipCodeOfDeceased, County, addressStr, })

    });


    let GEOresults = await Promise.all(yourData.map(async (file) => {
        if (file.addressOfDeceased) {
            let { results } = await GetCoordinates(file.addressStr)
            results = { results, file }
            return results
         }

        // if (file.addressOfDeceased) {
        //     console.log(file.date, file.DateFiled, file.caseNumber);
        // }
        return file;
    }))

    //  console.log(GEOresults)


    res.status(StatusCodes.OK).send({
        GEOresults
    })

    //load this in mongooseDb if !CASENUMBER OR !(Address of Deceased+City of Deceased+State of Deceased)  else Update row data

    //

    //add two more keys lat,long

    //
*/

}

const dateParserlocalFunc = (date) => {

    //console.log(date.split("(1)")[1]);

    if (date.split("(1)")[1] === '') {
        return (date.split("(1)")[0].slice(0, -1) + "T00:00:00Z")
    }

    //regExp copied from https://stackoverflow.com/questions/9823718/replace-forward-slash-character-in-javascript-string
    return (date.replace(/\//g, '-') + "T00:00:00Z");

}

//const GetCoordinates = async (req, res) => {
const GetCoordinates = async (addressStr) => {


    try {

        var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

        // var address = "29603 Ridgeway Dr, Agoura Hills, CA, 91301, Maricopa";

        var url = BASE_URL + addressStr + "&key=" + process.env.GOOGLE_GEO_CODING_API_KEY;

        const options = {
            method: 'GET',
            url: url,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };


        let { data } = await axios.request(options)
        return data;
        //res.status(StatusCodes.OK).json({ msg: data })
        // await Promise.allSettled([getfromGSheet(req.body)]).then((resGsheetApi) => {
        //     //console.log(resGsheetApi);
        //     const status = 'fulfilled';
        //     resGsheetApi.forEach(async (item) => {
        //         //console.log()
        //         if (item.status === status) {
        //             res.status(StatusCodes.OK).json({ status: 'fulfilled', ...JSON.parse(item.value) });
        //         }
        //     })
        // }).catch((e) => console.log(e));

    } catch (error) {

        console.log(error);

    }

}


//copied from https://gist.github.com/sarfarazansari/7e8ae05168b80b36016eb1c561a82f73#file-javascript-convert-2d-array-into-json-object

//create JSON object from 2 dimensional Array
function arrToObject(arr) {
    //assuming header
    var keys = arr[0];
    //vacate keys from main array
    var newArr = arr.slice(1, arr.length);

    var formatted = [],
        data = newArr,
        cols = keys,
        l = cols.length;
    for (var i = 0; i < data.length; i++) {
        var d = data[i],
            o = {};
        for (var j = 0; j < l; j++)
            o[cols[j]] = d[j];
        formatted.push(o);
    }
    return formatted;
}

export { GetCoordinates, ListOfAddresses }