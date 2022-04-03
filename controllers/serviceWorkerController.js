import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { google } from 'googleapis'
import { auth } from 'google-auth-library'

const TVRfetch = async (req, res) => {

    try {
        await Promise.allSettled([getfromGSheet(req.body)]).then((resGsheetApi) => {
            //console.log(resGsheetApi);
            //const status = 'fulfilled';
            //if (resGsheetApi.status === status) {
            res.status(StatusCodes.OK).json(...resGsheetApi);
            //}
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
        keyFile: "prime-works-329509-2f6599b47688.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
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