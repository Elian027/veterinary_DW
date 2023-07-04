//IMPORTACION DE JWT
import jwt from "jsonwebtoken";
//DEFINIR LA FUNCION PARA GENERAR EL TOKEN
const generarJWT = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}
//EXPORTACION POR DEFAULT DE LA FUNCION
export default  generarJWT