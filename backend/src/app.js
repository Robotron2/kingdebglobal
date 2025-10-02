import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import plansRoutes from "./routes/plansRoute.js"
import {errorHandler} from "./middlewares/errorHandler.js"

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





// Global Error Handler
app.use( errorHandler )

export default app
