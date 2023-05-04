import { PrismaClient } from '@prisma/client'
import cors from 'cors'


const corsMiddleware = cors({
  origin: '*'
})


export async function saveData(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  
  const token = req.headers.authorization
  //console.log();
 if( token=== `${process.env.TOKEN}`) {
      const prisma = new PrismaClient()
      const {email} = req.body
      //console.log(token)
      const user = await prisma.user.create({
        data: {
          email
        },
      })
      res.json({ user })
  } else{
    res.status(200).send('Mensagem: Metodo privado')
  }
}

// Adicionar o middleware cors() antes de definir a rota saveData()
export default function(req, res) {
  corsMiddleware(req, res, () => {

    saveData(req, res)
  })
}

