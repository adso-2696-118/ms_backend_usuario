// al loguerse y verificar si esta logueado y verificar el token lo puedo dejar hacer un token
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { error } from "../message/browser.js";
config();
// garantizar que las personas que inserten registros tengan las autorizaciones correspondientes

// Esto es para veificar el token
export const verifyToken = async(req, res, next) =>{
   const token = req.headers["x-access-token"];
   try {
    const valida = await jwt.verify(
        token, 
        process.env.TOKEN_PRIVATEKEY 
    );
    next();
    // si es valido el codigo que siga logueandose

    
} catch (e) {
    // return {"Token":"Token invalido"};
    error(req, res, 401, e)
}


}