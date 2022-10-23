// IMPORTACIONES
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("./conexion"); // Importacion de la conexion con mongoose desde el archivo conexion.js

// CONFIGURACION
const env = process.env; // revisar la maquina (puerto disponible en la maquina env => environment)
const port = env.PORT || 8000; // Buscar en la variable env, el puerto disponible, sino entonces usar el puerto 8000
const app = express();  // Creando la app

app.use(express.json()); // Interpretar objeto json como un objeto javascript
app.use(morgan("dev")); // Monitorear como desarrolladores
app.use(cors());

// ARRANQUE
app.listen(port, () => {
    console.log("API iniciado en el puerto " + port);
})

// RUTAS
app.get("/", (req, res) => {
    res.send("API iniciado"); // Enviar mensaje a la pagina
}); // Llamar la pagina directamente a la raiz, atraves del metodo get (cuando se hacen llamados el metodo get solicita el request y el response))

app.use("/categorias", require("./rutas/CategoriaRutas")); // Se indica la ruta en la que se accede a la lista de categorias