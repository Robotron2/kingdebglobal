import express from "express"
import {protect, restrictTo} from "../middlewares/protectRoute.js"
import {createPlan} from "../controllers/investmentPlanController.js"

const router = express.Router()

// router.get( "/", getPlans )
// router.get( "/:id", getPlan )

// admin routes
router.use( protect, restrictTo( "admin" ) )
router.post( "/create", createPlan )
// router.get( "/admin/all", getAllPlansAdmin )
// router.patch( "/:id", updatePlan )
// router.delete( "/:id", deletePlan )

export default router
