//IMPORTACION DE APP POR MEDIO DE MODULOS
import app from './server.js'
import connection from './database.js';
//EJECUCION DEL SERVIDOR EN EL PUERTO 3000
app.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})
//LLAMA A LA FUNCION
connection()