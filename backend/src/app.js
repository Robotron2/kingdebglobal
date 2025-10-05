import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import cron from "node-cron"
import authRoutes from "./routes/authRoutes.js"
import plansRoutes from "./routes/plansRoute.js"
import investmentRoutes from "./routes/investmentRoutes.js"
import webhookRoute from "./routes/webhookRoute.js"
import {errorHandler} from "./middlewares/errorHandler.js"
import {investmentMaturityChecker} from "../helpers/investmentHelpers.js"

dotenv.config()

const app = express()
app.use( cors() )
app.use( express.json() )
app.use( morgan( "dev" ) )

app.get( "/", ( req, res ) => {
    res.json( {message: "kingdeb server is active"} )
} )

app.use( "/api/auth", authRoutes )
app.use( "/api/plans", plansRoutes )
app.use( "/api/investments", investmentRoutes )
app.use( "/api/paystack", webhookRoute )

//cron jobs
cron.schedule( "0 * * * *", investmentMaturityChecker ) //Hourly



// Global Error Handler
app.use( errorHandler )

export default app
