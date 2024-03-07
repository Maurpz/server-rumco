import { Router } from 'express'

import { searchEmail_or_Number, saveInformation, changeStateRedirect, sendInfoAdmins} from '../utils/functionsRedirect.js'


const router = Router()


router.get('/redirects', (req, res) => {
  res.send('redirects')
})


router.post('/redirects', async (req, res) => {
  try {
    const { name, lastname, email, phoneNumber, message} = req.body
    const data = {
      name,
      lastname,
      email,
      phoneNumber,
      message
    } 
    // * primero comprovamos si ya se registo el numero o el email
    const resultSearch = await searchEmail_or_Number(email, phoneNumber)
    if (resultSearch.isSaved) {
        const resultSend = await sendInfoAdmins(data)
        if (resultSend.send) {
          res.status(201).json(
            {message: 'Email o numero registrado mensaje redirijido correctamente!'})
          return
        }
    }
    else {
      const resultSaveInformation = await saveInformation(data)
      if (resultSaveInformation.registered){
        const resultSend = await sendInfoAdmins(data)
        if (resultSend.send && resultSaveInformation.id){
          await changeStateRedirect(resultSaveInformation.id)
          res.status(200).json(
            {message: 'Redireccion Satisfactoria!'})
          return
        }
      }
    }
    res.status(500).json(
      {message : "Algo salio mal... :'("})
    return
  } catch (error) {
    res.status(501).json(
      {message : "Error Fatal"})
    return
  }
})

export default router

