"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
var _consola = require("./message/consola.js");
_app["default"].listen(_app["default"].get("port"), function () {
  (0, _consola.mensajeConsola)("puertoSuccess", "".concat(_consola.menssa.puerto, "  http://localhost:").concat(_app["default"].get("port")));
});