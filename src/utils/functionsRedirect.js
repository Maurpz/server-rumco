import { transporter } from '../libs/nodemailer.js'
import { prisma } from '../libs/prisma.js'
import 'dotenv/config.js'

const admin = process.env.ADMIN_RECEPTOR

export async function sendInfoAdmins (data) {
  try {
    const result = await transporter.sendMail({
      from: `Nose we 👻<${process.env.AUTH_USER_GMAIL}>`,
      to:`${admin}`,
      subject: 'Prueva de envio',
      text: `${JSON.stringify(data)}`
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
    return {registered: false}
  }
}