import { createTransport } from 'nodemailer'
import 'dotenv/config.js'

export var transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER_GMAIL,
    pass: process.env.AUTH_PASS_GMAIL,
  },
})

if (process.env.NODE !== 'production') global.transporter = transporter

