import express from "express"
import {createInvestment, getMyInvestments, } from "../controllers/investmentController.js"
import {protect} from "../middlewares/protectRoute.js"

const router = express.Router()

// Protected: user actions
router.use( protect )
router.post( "/", createInvestment )
router.get( "/", getMyInvestments )

// Restricted: Admin only


export default router
