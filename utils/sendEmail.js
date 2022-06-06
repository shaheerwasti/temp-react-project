"use strict";
import nodemailer from "nodemailer"
import nodemailerConfig from './nodemailerconfig.js'
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({ to, subject, html }) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(nodemailerConfig);

    // send mail with defined transport object
    return transporter.sendMail({
        from: '"noreply" <dash@gen.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default sendEmail;