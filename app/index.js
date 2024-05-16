import app from "./app.js";
import {mensajeConsola, menssa} from "./message/consola.js";


app.listen(app.get("port"), ()=>{
    mensajeConsola("puertoSuccess", `${menssa.puerto}  http://localhost:${app.get("port")}`);
});

