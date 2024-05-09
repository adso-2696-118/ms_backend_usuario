import express from "express";
import {config} from "dotenv";
// import {messageBrowse} from "./message/browser.js";
import ruta from "./routes/index.js";
config();

const app = express();

// middleware; funciones condicionadas 
app.use(express.json()); 

app.use(express.urlencoded({ extended : true}));


app.set("port",process.env.PORT || 3000);

// RUTAS
// app.get("/", (req, res) => {
//     res.json({"respuesta": messageBrowse.principal})
// });

app.use("/", ruta);

export default app;