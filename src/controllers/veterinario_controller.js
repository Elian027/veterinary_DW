import Veterinario from "../models/Veterinario.js"
import sendMailToUser from "../config/nodemailer.js"

const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(veterinarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await veterinarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const {nombre,apellido,direccion,telefono,_id} = veterinarioBDD
    res.status(200).json({
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:veterinarioBDD.email
    })
}
const perfil=(req,res)=>{
    res.status(200).json({res:'perfil del veterinario'})
}
const registro = async (req,res)=>{
    //CAPTURA LOS DATOS DEL BODY DE LA PETICION
    const {email,password} = req.body
    //VALIDACION DE LOS CAMPOS VACIOS
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    //VERIFICAR LA EXISTENCIA DEL MAIL 
    const verificarEmailBDD = await Veterinario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    //CREAR LA INSTANCIA DEL MODELO
    const nuevoVeterinario = new Veterinario(req.body)
    //ENCRIPTAR EL PASSWORD
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)
    const token = nuevoVeterinario.crearToken()
    await sendMailToUser(email,token)
    await nuevoVeterinario.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}
const confirmEmail = async (req,res)=>{
    //VALIDAR EL TOKEN DEL CORREO
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    //VERIFICAR SI EN BASE AL TOKEN EXISTE ESTE USUARIO 
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
    //VERIFICAR VALIDAR SI EL TOKEN YA FUE SETEADO A NULL
    if(!veterinarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    //SETEAR A NULL EL TOKEN
    veterinarioBDD.token = null
    //CAMBIAR A TRUE LA CONFIRMACION DE EMAIL
    veterinarioBDD.confirmEmail=true
    //GUARDAR CAMBIOS EN BD
    await veterinarioBDD.save()
    //PRESENTAR MENSAJES DEL USUARIO
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}
const listarVeterinarios = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}
const detalleVeterinario = (req,res)=>{
    res.status(200).json({res:'detalle de un veterinario registrado'})
}
const actualizarPerfil = (req,res)=>{
    res.status(200).json({res:'actualizar perfil de un veterinario registrado'})
}
const actualizarPassword = (req,res)=>{
    res.status(200).json({res:'actualizar password de un veterinario registrado'})
}
const recuperarPassword= (req,res)=>{
    res.status(200).json({res:'enviar mail recuperación'})
}
const comprobarTokenPasword= (req,res)=>{
    res.status(200).json({res:'verificar token mail'})
}
const nuevoPassword= (req,res)=>{
    res.status(200).json({res:'crear nuevo password'})
}
//EXPORTACION NOMBRADA
export {
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword
}