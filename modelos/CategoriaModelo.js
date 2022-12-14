const mongoose = require("mongoose");

// Creacion de un esquema de la coleccion categorias con mongoose:
const categoriaSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 40, required: true, unique: true },
    disponible: { type: Boolean, required: true },
    descripcion: { type: String, maxLength: 300 },
    imagen: { type: String, maxLength: 40, unique: true }
});

// Creacion y exportacion del modelo de nombre categorias y, apartir del esquema creado (categoriaSchema).
module.exports = mongoose.model("categorias", categoriaSchema);