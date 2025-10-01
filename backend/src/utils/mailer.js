import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

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
    try {
        await transporter.sendMail( {
            from: contactEmail,
            to: userMail,
            subject: "Kingdebglobal - Password Reset",
            html: `
        <html>
          <body>
            <h4>
              Your one-time password (OTP) for password reset is:
              <strong>${ token }</strong>.
              OTP expires in 15 minutes.
            </h4>
          </body>
        </html>
      `,
        } )
        return true
    } catch ( error ) {
        console.error( "Mailer error:", error )
        return false
    }
}
