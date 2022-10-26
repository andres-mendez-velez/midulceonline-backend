const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 40, required: true, unique: true },
    marca: { type: String, maxLength: 40, required: true },
    presentacion: { type: String, maxLength: 40, required: true }, // Cantidad de unidades y peso o volumen
    precio: { type: Number, required: true }, // Valor con decimales
    keywords: [{ type: String, maxLength: 15, unique: true }],
    disponible: { type: Boolean, required: true },
    categoria: { type: String, maxLength: 40, required: true },
    imagenes: [{ type: String, maxLength: 40, required: true, unique: false}] // Lista con las url o nombres de las imagenes del producto
});

module.exports = mongoose.model("productos", productoSchema);