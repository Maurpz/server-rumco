import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'

import redirectRoute from './routes/redirect.routes.js'

const corsOptions = {
  origin: 'https://rumco.pe',
}



const app = express()

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api',redirectRoute)


const PORT = process.env.PORT || 3000
app.listen( PORT)
console.log('Server on port: ', PORT)