//IMPORTACION DE JWT
import jwt from 'jsonwebtoken'
//IMPORTACION DE MODELO
import Veterinario from '../models/Veterinario.js'
//DEFINIR LA FUNCION PARA VALIDAR EL JWT
const verificarAutenticacion = async (req,res,next)=>{
    //VALIDACION DE JWT
    if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})    
    const {authorization} = req.headers
    try {
        const {id} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        req.veterinarioBDD = await Veterinario.findById(id).lean().select("-password")
        next()
    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({msg:e.message})
    }
}

export default verificarAutenticacion