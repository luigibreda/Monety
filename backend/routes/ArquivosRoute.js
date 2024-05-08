import express from "express"
import {
  createArquivo,
  deleteArquivo,
  editArquivo,
  getAllArquivos,
  getArquivo,
  getUserArquivos
} from "../controller/ArquivoController.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const router = express.Router()

router.get("/arquivos", getAllArquivos)
router.get("/:userId/arquivos", getUserArquivos)
router.get("/:userId/arquivos/:arquivoId", getArquivo)
router.post("/:userId/arquivos", verifyToken, createArquivo)
router.put("/:userId/arquivos/:arquivoId", verifyToken, editArquivo)
router.delete("/:userId/arquivos/:arquivoId", verifyToken, deleteArquivo)

export default router