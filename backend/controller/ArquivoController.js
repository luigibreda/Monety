import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

// GET Único arquivo
export const getArquivo = async (req, res) => {
  try {
    const { userId, arquivoId } = req.params

    const arquivo = await prisma.arquivo.findUnique({
      where: {
        id: Number(arquivoId),
        userId
      }
    })

    res.status(200).json(arquivo)
  } catch (error) {
    console.log(error)
  }
}

// GET Todos os arquivos
export const getAllArquivos = async (req, res) => {
  try {
    const page = Number(req.query.page) || 0
    const limit = Number(req.query.limit) || 10
    const search = req.query.search_query || ""
    const offset = page * limit
    const totalRows = await prisma.arquivo.count({
      where: {
        name: {
          contains: search
        }
      }
    })
    const totalPage = Math.ceil(totalRows / limit)
    const result = await prisma.arquivo.findMany({
      skip: offset,
      take: limit,
      where: {
        name: {
          contains: search
        }
      }
    })
    
    res.status(200).json({
      result,
      page,
      limit,
      totalRows,
      totalPage,
    })
  } catch (error) {
    console.log(error)
  }
}

// GET arquivos por usuário
export const getUserArquivos = async (req, res) => {
  try {
    const userId = req.params.userId
    const page = Number(req.query.page) || 0
    const limit = Number(req.query.limit) || 5
    const search = req.query.search_query || ""
    const offset = page * limit
    const totalRows = await prisma.arquivo.count({
      where: {
        userId,
        name: {
          contains: search
        }
      }
    })
    const totalPage = Math.ceil(totalRows / limit)
    const result = await prisma.arquivo.findMany({
      skip: offset,
      take: limit,
      where: {
        userId,
        name: {
          contains: search
        }
      }
    })

    res.json({
      result,
      page,
      limit,
      totalRows,
      totalPage
    })
  } catch (error) {
    console.log(error)
  }
}

// CREATE arquivo por usuario
export const createArquivo = async (req, res) => {
  try {
    const { name, price } = req.body
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)
    if (!name) return res.status(400).json({ message: "Nome Obrigatório"})
    if (!price) return res.status(400).json({ message: "Preço Obrigatório"})

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403)
    })
    
    const { userId } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) return res.sendStatus(404)
    if (user.refresh_token !== refreshToken) return res.sendStatus(403)

    const arquivo = await prisma.arquivo.create({
      data: {
        name,
        price: Number(price),
        userId
      }
    })

    res.status(201).json(arquivo)
  } catch (error) {
    console.log(error)
  }
}

// EDIT arquivo por usuário
export const editArquivo = async (req, res) => {
  try {
    const { name, price } = req.body
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)
    if (!name) return res.status(400).json({ message: "Nome Obrigatório"})
    if (!price) return res.status(400).json({ message: "Preço Obrigatório"})

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403)
    })
    
    const { userId, arquivoId } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) return res.sendStatus(404)
    if (user.refresh_token !== refreshToken) return res.sendStatus(403)

    const isArquivoExist = await prisma.arquivo.findUnique({
      where: {
        id: Number(arquivoId),
        userId
      }
    })

    if (!isArquivoExist) return res.sendStatus(404)

    const arquivo = await prisma.arquivo.update({
      where: {
        id: Number(arquivoId)
      },
      data: {
        name,
        price: Number(price)
      }
    })

    res.status(201).json(arquivo)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

// DELETE arquivo por usuário
export const deleteArquivo = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403)
    })
    
    const { userId, arquivoId } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: userId  
      }
    })

    if (!user) return res.sendStatus(404)
    if (user.refresh_token !== refreshToken) return res.sendStatus(403)

    const isArquivoExist = await prisma.arquivo.findUnique({
      where: {
        id: Number(arquivoId),
        userId
      }
    })

    if (!isArquivoExist) return res.sendStatus(404)

    const deletedArquivo = await prisma.arquivo.delete({
      where: {
        id: Number(arquivoId),
        userId
      }
    })

    res.status(200).json({
      message: "Arquivo deletado",
      data: deletedArquivo
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}