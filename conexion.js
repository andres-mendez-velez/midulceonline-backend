const mongoose = require("mongoose"); // Para poder hacer la conexion a la BD

const username = "admin";
const password = "admin";
const database = "BeerusBD";
const URI = "mongodb+srv://" + username + ":" + password + "@cluster0.wwgfrbg.mongodb.net/" + database + "?retryWrites=true&w=majority"; // Driver de conexión al cluster0 en mongodb

const conectar = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Atlas en linea");
    } catch (error) {
        console.log("Error en la conexion. " + error);
    }
}

conectar();

module.exports = mongoose; // Exportar la conexion con mongoose para importarlar desde index.js