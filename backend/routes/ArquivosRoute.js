import express from "express"
import {
  deleteArquivo,
  editArquivo,
  getAllArquivos,
  getArquivo,
  getUserArquivos,
  enviaArquivo
} from "../controller/ArquivoController.js"
import { verifyToken } from "../middlewares/verifyToken.js"
// import multer from "multer"

// const upload = multer({ dest: 'uploads/' }).any();

const router = express.Router()

router.get("/arquivos", getAllArquivos)
router.get("/:userId/arquivos", getUserArquivos)
router.get("/:userId/arquivos/:arquivoId", getArquivo)
// router.post("/:userId/arquivos", verifyToken, createArquivo)
router.put("/:userId/arquivos/:arquivoId", verifyToken, editArquivo)
router.delete("/arquivos/:arquivoId", verifyToken, deleteArquivo)
// router.post("/:userId/upload", verifyToken, upload, enviaArquivo);


export default router