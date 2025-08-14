/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { envStrings } from "../config/env.config";
import { AppError } from "../config/errors/App.error";

// const transporter = nodemailer.createTransport({
//     // port: envStrings.EMAIL_SENDER.SMTP_PORT,
//     secure: true,
//     auth: {
//         user: envStrings.GMAIL_ADDRESS_HOST,
//         pass: envStrings.GMAIL_APP_PASS
//     },
//     // port: Number(envStrings.EMAIL_SENDER.SMTP_PORT),
//     // host: envStrings.EMAIL_SENDER.SMTP_HOST
// })

const transporter = nodemailer.createTransport( {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: envStrings.GMAIL_ADDRESS_HOST,
        pass: envStrings.GMAIL_APP_PASS,
    },
} );

interface SendEmailOptions {
    to: string,
    subject: string;
    templateName: string;
    templateData?: Record<string, any>
    attachments?: {
        filename: string,
        content: Buffer | string,
        contentType: string
    }[]
}

export const sendEmail = async ({
    to,
    subject,
    templateName,
    templateData,
    attachments
}: SendEmailOptions) => {
    try {
        const templatePath = path.join(__dirname, `templates/${templateName}.ejs`)
        const html = await ejs.renderFile(templatePath, templateData)
        const info = await transporter.sendMail({
            from: envStrings.GMAIL_ADDRESS_HOST,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map(attachment => ({
                filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType
            }))
        })
        console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    }
    catch ( error: any )
    {
        console.log("email sending error", error.message);
        throw new AppError(401, "Email error")
    }

}