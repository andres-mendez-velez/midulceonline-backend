const mongoose = require("mongoose");

const compraSchema = mongoose.Schema({
    nombreUser: { type: String, required: true },
    apellidoUser: { type: String, required: true },
    documentoUser: { type: String, required: true, unique: true },
    direccionUser: { type: String, required: true },
    telefonoUser: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    nombreProd: { type: String, required: true, unique: true },
    cantidadPedida: { type: Number, required: true },
    precioUnitario: { type: Number, required: true },
    precioTotal: { type: Number, required: true },
    estadoCompra: { type: String, required: true }
});

module.exports = mongoose.model("compras", compraSchema);