import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import fs from "fs"

const prisma = new PrismaClient()

// GET Único arquivo
export const getArquivo = async (req, res) => {
  try {
    const { arquivoId } = req.params

    const arquivo = await prisma.arquivos.findUnique({
      where: {
        id: arquivoId
      }
    })

    if (!arquivo) 
      return res.status(404).json({ error: 'Arquivo não encontrado' });

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
    const totalRows = await prisma.arquivos.count({
      where: {
        nome: {
          contains: search
        }
      }
    })
    const totalPage = Math.ceil(totalRows / limit)
    const result = await prisma.arquivos.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        nome: {
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
    const userId = req.params.arquivoId
    const page = Number(req.query.page) || 0
    const limit = Number(req.query.limit) || 5
    const search = req.query.search_query || ""
    const offset = page * limit
    const totalRows = await prisma.arquivos.count({
      where: {
        userId,
        nome: {
          contains: search
        }
      }
    })
    const totalPage = Math.ceil(totalRows / limit)
    const result = await prisma.arquivos.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        userId,
        nome: {
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

// // CREATE arquivo por usuario
// export const createArquivo = async (req, res) => {
//   try {
//     const { name, price } = req.body
//     const refreshToken = req.cookies.refreshToken

//     if (!refreshToken) return res.sendStatus(401)
//     if (!name) return res.status(400).json({ message: "Nome Obrigatório"})
//     if (!price) return res.status(400).json({ message: "Preço Obrigatório"})

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       if (err) return res.sendStatus(403)
//     })
    
//     const { userId } = req.params

//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     })

//     if (!user) return res.sendStatus(404)
//     if (user.refresh_token !== refreshToken) return res.sendStatus(403)

//     const arquivo = await prisma.arquivos.create({
//       data: {
//         name,
//         price: Number(price),
//         userId
//       }
//     })

//     res.status(201).json(arquivo)
//   } catch (error) {
//     console.log(error)
//   }
// }

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

    const isArquivoExist = await prisma.arquivos.findUnique({
      where: {
        id: Number(arquivoId),
        userId
      }
    })

    if (!isArquivoExist) return res.sendStatus(404)

    const arquivo = await prisma.arquivos.update({
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

// aprovarDesaprovar arquivo
export const pausarDespausarArquivo = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) return res.sendStatus(401);
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
    });
    
    const { arquivoId } = req.params;
  
    const user = await prisma.user.findUnique({
      where: {
        id: req.usuario.userId  
      }
    });
  
    if (!user) return res.sendStatus(404);
    if (user.refresh_token !== refreshToken) return res.sendStatus(403);
  
    const isArquivoExist = await prisma.arquivos.findUnique({
      where: {
        id: arquivoId
      }
    });
  
    if (!isArquivoExist) return res.sendStatus(404);
  
    // Alterar o estado do arquivo entre 1 e 3
    const updatedArquivo = await prisma.arquivos.update({
      where: {
        id: arquivoId,
        userId: req.usuario.userId 
      },
      data: {
        estado: isArquivoExist.estado === 0 ? 3 : 0
      }
    });
  
    res.status(200).json({
      message: "Estado do arquivo modificado com sucesso",
      data: updatedArquivo
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export const aprovarArquivo = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) return res.sendStatus(401);
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
    });
    
    const { arquivoId } = req.params;
  
    const user = await prisma.user.findUnique({
      where: {
        id: req.usuario.userId  
      }
    });
  
    if (!user) return res.sendStatus(404);
    if (user.refresh_token !== refreshToken) return res.sendStatus(403);
  
    const isArquivoExist = await prisma.arquivos.findUnique({
      where: {
        id: arquivoId
      }
    });
  
    if (!isArquivoExist) return res.sendStatus(404);
  
    // Alterar o estado do arquivo para 2 (aprovado)
    const updatedArquivo = await prisma.arquivos.update({
      where: {
        id: arquivoId,
        userId: req.usuario.userId 
      },
      data: {
        estado: 2
      }
    });
  
    res.status(200).json({
      message: "Arquivo aprovado com sucesso",
      data: updatedArquivo
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export const reprovarArquivo = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) return res.sendStatus(401);
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
    });
    
    const { arquivoId } = req.params;
  
    const user = await prisma.user.findUnique({
      where: {
        id: req.usuario.userId  
      }
    });
  
    if (!user) return res.sendStatus(404);
    if (user.refresh_token !== refreshToken) return res.sendStatus(403);
  
    const isArquivoExist = await prisma.arquivos.findUnique({
      where: {
        id: arquivoId
      }
    });
  
    if (!isArquivoExist) return res.sendStatus(404);
  
    // Alterar o estado do arquivo para 1 (reprovado)
    const updatedArquivo = await prisma.arquivos.update({
      where: {
        id: arquivoId,
        userId: req.usuario.userId 
      },
      data: {
        estado: 1
      }
    });
  
    res.status(200).json({
      message: "Arquivo reprovado com sucesso",
      data: updatedArquivo
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
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
    
    const { arquivoId } = req.params

    const user = await prisma.user.findUnique({
      where: {
        id: req.usuario.userId  
      }
    })

    if (!user) return res.sendStatus(404)
    if (user.refresh_token !== refreshToken) return res.sendStatus(403)

    const isArquivoExist = await prisma.arquivos.findUnique({
      where: {
        id: arquivoId,
        userId: req.usuario.userId 
      }
    })

    if (!isArquivoExist) return res.sendStatus(404)

    const deletedArquivo = await prisma.arquivos.delete({
      where: {
        id: arquivoId,
        userId: req.usuario.userId 
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


// CREATE arquivo por usuario com upload de arquivo
export const enviaArquivo = async (req, res) => {
  try {

    const userId = req.usuario.userId;


        // Verifica se os arquivos foram enviados
        if (!req.files || req.files.length === 0) {
          // return res.status(400).json({ message: "Arquivo é obrigatório" });    // TODO: DESCOMENTAR EM PROD

          // Se nenhum arquivo for enviado, salve um arquivo em branco
          const arquivo = await prisma.arquivos.create({
            data: {
              nome: "Arquivo em Branco",
              path: "", // Defina o caminho como vazio
              filename: "", // Defina o nome do arquivo como vazio
              userId: userId,
              tipo: "application/octet-stream", // Defina o tipo como "application/octet-stream" para um arquivo em branco
              tamanho: "0" // Defina o tamanho como "0" para um arquivo em branco
            }
          });
    
          return res.status(201).json(arquivo);
        }
    

    // Extrai o primeiro arquivo da lista de arquivos
    const file = req.files[0];

    // Extrai as informações do arquivo
    const { originalname, filename, path } = file;

    // Salva o arquivo no banco de dados
    const arquivo = await prisma.arquivos.create({
      data: {
        nome: originalname,
        path: path,
        filename: filename,
        userId: userId,
        tipo: file.mimetype,
        tamanho: String(file.size)
      }
    });

    res.status(201).json(arquivo);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const downloadArquivo = async (req, res) => {
  try {
    const arquivoId = req.params.arquivoId;

    // Encontra o arquivo pelo ID
    const arquivo = await prisma.arquivos.findUnique({
      where: {
        id: arquivoId
      }
    });

    if (!arquivo) {
      return res.status(404).json({ message: "Arquivo não encontrado." });
    }

    // Define o caminho do arquivo
    const filePath = arquivo.path;

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Arquivo não encontrado." });
    }

    // Define o cabeçalho de resposta para o download do arquivo
    res.setHeader("Content-Disposition", `attachment; filename=${arquivo.nome}`);
    res.setHeader("Content-Type", arquivo.tipo);

    // Lê o arquivo do sistema de arquivos e envia como resposta
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// export { upload };