const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 40, required: true, unique: true },
    marca: { type: String, maxLength: 40, required: true },
    presentacion: { type: String, maxLength: 40, required: true }, // Cantidad de unidades y peso o volumen
    cantidad: {type: Number, required: true},
    precio: { type: Number, required: true }, // Valor con decimales
    keywords: [{ type: String, maxLength: 15 }],
    disponible: { type: Boolean, required: true },
    categoria: { type: String, maxLength: 40, required: true },
    imagenes: [{ type: String, maxLength: 40 }] // Lista con las url o nombres de las imagenes del producto
});

module.exports = mongoose.model("productos", productoSchema);