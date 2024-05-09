//Crear metodos que voy a llamar en mis rutas
// todos los metodos que vayamos a utiliza hay que crearlos aparte en el controlador

import {success, error} from "../message/browser.js"
import pool from "../config/db.mysql.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const crearUsuario = async(req, res) =>{
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const claveSinCifrar = req.body.clave;
   
    try {
        const hash = await bcrypt.hash(claveSinCifrar, 2); //Para encripta cla contraseña, funciones externas se le ponen await
        const clave = hash;
        const respuesta = await pool.query(`CALL sp_CrearUsuario('${nombre}', '${usuario}', '${clave}');`);

        if (respuesta[0].affectedRows == 1){
            success(req, res, 201, "Usuario creado");
        } else {
            error(req, res, 400, "No se pudo agregar el nuevo usuario")
        }
     
        
    } catch (err) {
        error(req, res, 400, err)
    }
};

export const listarUsuario = async(req, res)=>{
    try {
        const respuesta = await pool.query(`CALL sp_ListarUsuario();`);
        console.log(respuesta);
        success(req, res, 200, respuesta[0]);
        
    } catch (err) {
        error(req, res, 500, err)
    }
}

export const mostrarUsuario = async(req, res) =>{
    // Consulta de todos los usuarios}
   let id = req.params['id'];

    try {
        const respuesta = await pool.query(`CALL sp_MostrarUsuario(${id});`);
        console.log(respuesta);
        success(req, res, 200, respuesta[0]);
        
    } catch (err) {
        error(req, res, 500, err)
    }
    
};

export const modificarUsuario = async(req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const claveSinCifrar = req.body.clave;
    const clave = claveSinCifrar ;
    try {
        const respuesta = await pool.query(`CALL sp_ModificarUsuario(${id}, '${nombre}', '${usuario}', '${clave}');`);
        if (respuesta[0].affectedRows == 1){
            success(req, res, 201, "Usuario creado:" + usuario);

        } else {
            error(req, res, 400, "No se pudo modificar el usuario:" + usuario)
        }
     
        
    } catch (err) {
        error(req, res, 400, err)
    }                      
};

export const eliminarUsuario = async(req, res) =>{
    const id = req.body.id;
    
    try {
        const respuesta = await pool.query(`CALL sp_EliminarUsuario(${id});`);
        if (respuesta[0].affectedRows == 1){
            success(req, res, 201, "se ha eliminadp el usuario" );

        } else {
            error(req, res, 400, "No se pudo eliminar el usuario:")
        }
     
        
    } catch (err) {
        error(req, res, 400, err)
    }      
};

export const logueoUsuario = async(req, res) =>{
    const {usuario, clave} = req.body;
    // hay que comparar contraseña de la base de datos a la que le estamos mandando
   
    try{
        const respuesta = await pool.query(`CALL sp_BuscarUsuario('${usuario}');`);
        if (respuesta[0][0]==0){
            error(req, res, 404, "Usuario no existe" );
            return;
            
        }
       
        const match = await bcrypt.compare(clave, respuesta[0][0][0].CLAVE);
        if (!match){
            error(req, res, 401, "Clave errada" );
            return;
        }
        let payloan = {
            "usuario" : usuario,
            "nombre" : respuesta[0][0][0].NOMBRE
        };
    // Creacion del token, la funcion del login es crear el token, los unicos que pueden crear un token son los ya registrados
    // Solo se puede editar el usuario si este tiene un token valido
    // La unica fporma de crear una ruta es con autorizacion
        let token = await jwt.sign(
            payloan,
            process.env.TOKEN_PRIVATEKEY,
            {
                expiresIn : process.env.TPKEN_EXPIRES_IN
            });
    // Es como si le estuvuerramos diciendo: token : token
        success(req, res, 200, {token} );

    } catch (e) {
       
        error(req, res, 500, "Error em el servidor, por favor intentelo de nuevo" );

    }

}