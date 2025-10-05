import express from "express"
import {paystackWebhook} from "../controllers/webhookController.js"

const router = express.Router()
router.post( "/webhook", express.raw( {type: "application/json"} ), paystackWebhook )

export default router
