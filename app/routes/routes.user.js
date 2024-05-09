// RUATA PARA MIS USUARIOS
import {Router} from "express";
import { crearUsuario, 
    eliminarUsuario, 
    listarUsuario, 
    modificarUsuario, 
    mostrarUsuario, 
    logueoUsuario } from "../controllers/controllers.user.js";

const rutaUser = Router();

// SOLO RUTA Y NOMBRE DEL CONTROLADOR

// Get: sirve para mostrar datos
rutaUser.get("/user/:id", mostrarUsuario);

// Get: sirve para mostrar todos los usuarios
rutaUser.get("/user", listarUsuario);

// Post: sirve para guardar o crear
rutaUser.post("/user", crearUsuario);

// Put : editar informacion
rutaUser.put("/user", modificarUsuario);

// Delete : eliminar informacion
rutaUser.delete("/user", eliminarUsuario);

// Para loguearse
rutaUser.post("/login", logueoUsuario)
export default rutaUser;
