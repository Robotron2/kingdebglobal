import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"
import {generateEmailTemplate} from "./emailTemplate.js"

const host = process.env.SMTP_HOST
const port = process.env.SMTP_PORT
const secret = process.env.JWT_SECRET

const contactEmail = process.env.CONTACT_EMAIL
const contactPass = process.env.CONTACT_PASS

const transporter = nodemailer.createTransport( {
    host,
    port,
    secure: true,
    auth: {
        user: contactEmail,
        pass: contactPass,
    },
} )

export const forgotPasswordMailer = async ( userMail, token ) => {
    const html = generateEmailTemplate( {
        title: "Password Reset OTP",
        message: `Your one-time password (OTP) for password reset is <strong>${ token }</strong>. It expires in 15 minutes.`,
    } )
    try {
        await transporter.sendMail( {
            from: contactEmail,
            to: userMail,
            subject: "Kingdebglobal - Password Reset",
            html,
        } )
        return true
    } catch ( error ) {
        console.error( "Mailer error:", error )
        return false
    }
}
export const sendRegisterEmail = async ( userMail ) => {
    const html = generateEmailTemplate( {
        title: "Welcome to my App",
        message: `You're welcome to my pineapple farm. Here you can buy pineapples, buy suckers even make investments for up to 2 years. Flexible & pocket friendly.`,
        buttonText: "My github",
        buttonLink: "https://github.com/robotron2",
    } )
    try {
        await transporter.sendMail( {
            from: contactEmail,
            to: userMail,
            subject: "PineappleApp - Welcom",
            html,
        } )
        console.log( `Welcome email sent on successful registration` )
        return true
    } catch ( error ) {
        console.error( "Mailer error:", error )
        return false
    }
}

export const sendBatchMatureEmails = async ( emails, batchSize = 10, delay = 2000 ) => {
    // emails ===> array of { to, subject, text, html }
    for ( let i = 0;i < emails.length;i += batchSize ) {
        const batch = emails.slice( i, i + batchSize )

        // send all in batch concurrently
        await Promise.all(
            batch.map( email =>
                sendMatureEmail( email ).catch( err => {
                    console.error( "Batch send error:", err )
                } )
            )
        )
        // delay before next batch (avoid rate limit)
        if ( i + batchSize < emails.length ) {
            await new Promise( res => setTimeout( res, delay ) )
        }
    }
}
