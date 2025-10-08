import express from "express"
import {cancelInvestment, createInvestment, getMyInvestments, requestWithdrawal, } from "../controllers/investmentController.js"
import {protect} from "../middlewares/protectRoute.js"
import {requireVerified} from "../middlewares/requireVerified.js"

const router = express.Router()

// Protected: user actions
router.use( protect, requireVerified )
router.post( "/", createInvestment )
router.get( "/", getMyInvestments )
router.post( "/:investmentId/withdraw", requestWithdrawal )
router.patch( "/:investmentId/cancel", cancelInvestment )

// Restricted: Admin only


export default router
