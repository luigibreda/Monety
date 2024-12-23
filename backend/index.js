import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import UsuariosRoute from "./routes/UsuariosRoute.js"
import ArquivosRoute from "./routes/ArquivosRoute.js"
dotenv.config()

const app = express()

// Lista de domínios permitidos
const allowedOrigins = [
  "https://monety.vercel.app",
  "https://monetyapp.com.br",
  "http://localhost:4200"
];

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (como as feitas por ferramentas de teste e scripts locais)
    if (!origin) return callback(null, true);
    // Verifica se a origem da requisição está na lista de domínios permitidos
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"] // Permitindo todos os métodos necessários
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use(UsuariosRoute)
app.use(ArquivosRoute)

app.listen(process.env.PORT, () => console.log("Server is running... port: "+process.env.PORT))