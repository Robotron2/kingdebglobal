import express from "express"
import {login, register, resetPassword, sendResetOTP, verifyEmail} from "../controllers/authController.js"
import {resetPasswordLimiter} from "../middlewares/rateLimiter.js"


const router = express.Router()

router.post( "/register", register )
router.post( "/login", login )
router.get( "/verify", verifyEmail )
router.post( "/forgot-password", sendResetOTP )
router.post( "/reset-password", resetPasswordLimiter, resetPassword )

export default router
