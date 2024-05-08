import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import UserRoute from "./routes/UserRoute.js"
import ArquivosRoute from "./routes/ArquivosRoute.js"
dotenv.config()

const app = express()

// Middlewares
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use(UserRoute)
app.use(ArquivosRoute)

app.listen(process.env.PORT, () => console.log("Server is running... port: "+process.env.PORT))