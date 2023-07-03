import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

// Creación del transporter
const transport = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})

// send mail with defined transport object
const sendMailToUser = async(userMail,token)=>{
    let info = await transport.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Verifica tu cuenta de correo electrónico",
    html: `
    <h1>Sistema de gestión (VET-ESFOT 🐶 😺)</h1>
    <hr>
    <a href="http://localhost:3000/api/confirmar/${token}">Clic para confirmar tu cuenta</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

export default sendMailToUser