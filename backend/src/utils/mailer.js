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
        message: `Your OTP is <strong>${ token }</strong>. It expires in 15 minutes.`,
        variant: "info",
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

// export const sendRegisterEmail = async ( userMail ) => {
//     const html = generateEmailTemplate( {
//         title: "Registration Successful",
//         message: `
//         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus quisquam, laudantium, laboriosam aut quod
//         explicabo, labore libero maxime blanditiis ab consectetur? At consequuntur eaque officiis voluptas ut quis sequi
//         mollitia.
//         `,
//         buttonText: "Go to Dashboard",
//         buttonLink: "https://github.com/robotron2",
//         variant: "success",
//     } )
//     try {
//         await transporter.sendMail( {
//             from: contactEmail,
//             to: userMail,
//             subject: "PineappleApp - Welcome",
//             html,
//         } )
//         console.log( `Welcome email sent on successful registration` )
//         return true
//     } catch ( error ) {
//         console.error( "Mailer error:", error )
//         return false
//     }
// }
export const sendRegisterEmail = async ( email, name = "" ) => {
    const title = `Welcome to KingDeb Farm${ name ? `, ${ name }` : "" }!`
    const message = `
      We're excited to have you on board. Start exploring investments and opportunities with us.
      Please verify your email to activate your account.
    `

    const html = generateEmailTemplate( {
        title,
        message,
        buttonText: "Verify Email",
        buttonLink: `${ process.env.FRONTEND_URL }/verify?email=${ email }`,
        variant: "success"
    } )

    await transporter.sendMail( {
        from: `"KingDeb Farm" <${ process.env.SMTP_USER }>`,
        to: email,
        subject: "Welcome to KingDeb Farm – Verify Your Email",
        html,
    } )
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
