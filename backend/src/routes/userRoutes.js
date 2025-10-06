import express from "express"
import {protect} from "../middlewares/protectRoute.js"
import {getProfile, updateProfile} from "../controllers/userController.js"

const router = express.Router()

router.get( "/profile", protect, getProfile )
router.patch( "/profile", protect, updateProfile )

export default router
