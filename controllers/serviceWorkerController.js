import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { google } from 'googleapis'
import csv from 'csvtojson'
import { auth } from 'google-auth-library'
const TVRfetch = async (req, res) => {

    try {
        await Promise.allSettled([getfromGSheet(req.body)]).then((resGsheetApi) => {
            //console.log(resGsheetApi);
            const status = 'fulfilled';
            resGsheetApi.forEach(async (item) => {

                //console.log()
                if (item.status === status) {

                    let myString = item.value.replace(/['"]+/g, '')
                    let jsonData = await csv({ output: "line" })
                        .fromString(myString)
                    // .subscribe((csvLine) => {
                    // csvLine =>  "1,2,3" and "4,5,6"
                    //console.log(jsonData);
                    myString = myString.replace(/\n/g, '').split("values: ")[1].split("}")[0]
                    res.status(StatusCodes.OK).json(myString);
                    // })
                }
            })
        }).catch((e) => console.log(e));
    } catch (error) {
        console.log(error);
    }
}



async function sendtoGsheet(valArr) {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });
    const spreadsheetId = "1rP4JIwMpHEoxiqmFCmqMkaAeL4XpxpEHeJM50GEwSO8";

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:Z",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[valArr]]
        }
    });

}

const getfromGSheet = async ({ spreadsheetId, range }) => {
    console.log(spreadsheetId, range);
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.KEY_FILE,
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const oauth2Client = new google.auth.OAuth2(
        '1066823544715-rjr4p71r48rkofsb9s86c58mvrmiim5h.apps.googleusercontent.com',
        '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',
        'https://dash-gen.herokuapp.com/oauth2callback'
    );

    let API_KEY = 'AIzaSyAtO5Ll9NStUIlYx1e16AnJVZMCztmKgpI'

    const sheets = google.sheets('v4');

    const request = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId,
        // The A1 notation of the values to retrieve.
        range,
        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
        valueRenderOption: 'UNFORMATTED_VALUE',
        // How dates, times, and durations should be represented in the output.
        // This is ignored if value_render_option is
        // FORMATTED_VALUE.
        // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
        dateTimeRenderOption: 'SERIAL_NUMBER',
        auth,
    };
    try {
        const response = (await sheets.spreadsheets.values.get(request)).data;
        return JSON.stringify(response, null, 2)
    } catch (err) {
        console.error(err);
    }

}



export { TVRfetch }