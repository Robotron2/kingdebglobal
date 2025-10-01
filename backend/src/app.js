import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
// import authRoutes from "./routes/authRoutes.js"
import {errorHandler} from "./middlewares/errorHandler.js"

dotenv.config()

const app = express()
app.use( cors() )
app.use( express.json() )
app.use( morgan( "dev" ) )

app.get( "/", ( req, res ) => {
    res.send( "🌿 Farm Investment API is running..." )
} )

// app.use( "/api/auth", authRoutes )





// Global Error Handler
app.use( errorHandler )

export default app
