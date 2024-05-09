import colors from "colors";


export const mensajeConsola = (tipo, mensaje) => {
    switch (tipo) {
        case "puertoSuccess":
            console.log(mensaje.bgGreen);
            break;
        case "puertoError":
            console.log(mensaje.bgRed);
            break;
    }
}

export const menssa = {
    puerto:"Ejecutandose en el puerto:"
}