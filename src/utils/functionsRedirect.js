import { transporter } from '../libs/nodemailer.js'
import { prisma } from '../libs/prisma.js'
import 'dotenv/config.js'

const admin = process.env.ADMIN_RECEPTOR

export async function sendInfoAdmins (data) {
  try {
    const result = await transporter.sendMail({
      from: `Rumco-bot 🤖<${process.env.AUTH_USER_GMAIL}>`,
      to:`${admin}`,
      subject: `Datos prospectos ${data.name} ${data.lastname}`,
      text: `
      <strong>Nombre: </strong><span>${data.name}</span><br>
      <strong>Apellidos: </strong><span>${data.lastname}</span><br>
      <strong>Correo: </strong><span>${data.email}</span><br>
      <strong>Numero: </strong><span>${data.phoneNumber}</span><br>
      <strong>Mensaje: </strong><span>${data.message}</span><br>
      `
    })
    return {send: true, status:200}
  } catch (error) {
    console.log(error)
    return {send: false, status: 500}
  }
}





export async function searchEmail_or_Number (email, phoneNumber){
  try {
    const res = await prisma.infoRedirect.findFirst({
      where: {
        OR: [
          {email},
          {phoneNumber}
        ]
      }
    })
    if (res?.registerdAt) {
      return {id: res.id, isSaved: true}
    }
    return {isSaved: false}
  } catch (error){
    console.log(error)
    return {isSaved: false}
  }
  
  
}

export async function changeStateRedirect (id) {
  try {
    const res = await prisma.infoRedirect.update({
      where: {
        id
      },
      data: {
        redirect:true
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export async function saveInformation (data) {
  console.log('guardadndo la informacion')
  try {
    const queryResult = await prisma.infoRedirect.create({
      data: {
        ...data
      }
    })
    return {
      registered: true ,
      id: queryResult.id
    }
  } catch (error) {
    console.log(error)
    return {registered: false}
  }
}