"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controllersUser = require("../controllers/controllers.user.js");
var _oauth = require("../middlewares/oauth.js");
// RUATA PARA MIS USUARIOS

var rutaUser = (0, _express.Router)();
// Se hace una validacion del token, esto es una prueba
// console.log(verifyToken("ieyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYmVjZSIsIm5vbWJyZSI6ImJlY2VycmEiLCJpYXQiOjE3MTUyNjk0ODUsImV4cCI6MTcxNTI3MTg4NX0.nZ3-n6QGZTD2016r2PmJ1yas2TcqvBT3iy2kJs-Ogys"));

// SOLO RUTA Y NOMBRE DEL CONTROLADOR

// Get: sirve para mostrar datos
rutaUser.get("/user/:id", _controllersUser.mostrarUsuario);

// Get: sirve para mostrar todos los usuarios
rutaUser.get("/user", _controllersUser.listarUsuario);

// Post: sirve para guardar o crear
rutaUser.post("/user", _oauth.verifyToken, _controllersUser.crearUsuario);

// Put : editar informacion
rutaUser.put("/user", _oauth.verifyToken, _controllersUser.modificarUsuario);

// Delete : eliminar informacion
rutaUser["delete"]("/user", _oauth.verifyToken, _controllersUser.eliminarUsuario);

// Para loguearse
rutaUser.post("/login", _controllersUser.logueoUsuario);
var _default = exports["default"] = rutaUser;