import app from "./app/app.js";
import {mensajeConsola, menssa} from "./app/message/consola.js";


app.listen(app.get("port"), ()=>{
    mensajeConsola("puertoSuccess", `${menssa.puerto}  http://localhost:${app.get("port")}`);
});

