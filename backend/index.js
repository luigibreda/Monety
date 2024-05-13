import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import UsuariosRoute from "./routes/UsuariosRoute.js"
import ArquivosRoute from "./routes/ArquivosRoute.js"
dotenv.config()

const app = express()

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"] // Permitindo todos os métodos necessários
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use(UsuariosRoute)
app.use(ArquivosRoute)

app.listen(process.env.PORT, () => console.log("Server is running... port: "+process.env.PORT))