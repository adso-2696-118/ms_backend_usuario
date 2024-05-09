// RUATA PARA MIS USUARIOS
import {Router} from "express";
import { crearUsuario, 
    eliminarUsuario, 
    listarUsuario, 
    modificarUsuario, 
    mostrarUsuario, 
    logueoUsuario } from "../controllers/controllers.user.js";

import { verifyToken } from "../middlewares/oauth.js";

const rutaUser = Router();
// Se hace una validacion del token, esto es una prueba
// console.log(verifyToken("ieyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYmVjZSIsIm5vbWJyZSI6ImJlY2VycmEiLCJpYXQiOjE3MTUyNjk0ODUsImV4cCI6MTcxNTI3MTg4NX0.nZ3-n6QGZTD2016r2PmJ1yas2TcqvBT3iy2kJs-Ogys"));

// SOLO RUTA Y NOMBRE DEL CONTROLADOR

// Get: sirve para mostrar datos
rutaUser.get("/user/:id", mostrarUsuario);

// Get: sirve para mostrar todos los usuarios
rutaUser.get("/user", listarUsuario);

// Post: sirve para guardar o crear
rutaUser.post("/user", verifyToken, crearUsuario);

// Put : editar informacion
rutaUser.put("/user", verifyToken, modificarUsuario);

// Delete : eliminar informacion
rutaUser.delete("/user", verifyToken, eliminarUsuario);

// Para loguearse
rutaUser.post("/login", logueoUsuario)
export default rutaUser;
