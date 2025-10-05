import axios from "axios"
import crypto from "crypto"
import ApiError from "./ApiError.js"



const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL

export const initiatePayment = async ( email, amount, metadata = null, kingDebRef ) => {
    if ( !email || !amount ) {
        throw new ApiError( 'Email and amount are required for payment initiation', 400 )
    }

    const payload = {
        email,
        amount, //kobo
        ...( metadata && {metadata} ),
    }

    try {
        const {data} = await axios.post(
            `${ PAYSTACK_BASE_URL }/transaction/initialize`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${ PAYSTACK_SECRET_KEY }`,
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            }
        )

        if ( !data.status ) {
            throw new ApiError( data.message || 'Payment initialization failed', 400 )
        }

        return data.data //authorization_url
    } catch ( error ) {
        if ( error.response ) {
            throw new ApiError(
                error.response.data?.message || 'Paystack API error',
                error.response.status
            )
        } else if ( error.request ) {
            throw new ApiError( 'No response from Paystack server', 503 )
        } else {
            throw new ApiError( error.message || 'Unexpected payment error', 500 )
        }
    }
}


export const verifyPaystackSignature = ( req ) => {
    const signature = req.headers["x-paystack-signature"]
    const hash = crypto.createHmac( "sha512", PAYSTACK_SECRET_KEY ).update( JSON.stringify( req.body ) ).digest( "hex" )
    return signature === hash
}