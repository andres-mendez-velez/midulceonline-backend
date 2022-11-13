const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    direccion: { type: String, maxLength: 200, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

module.exports = mongoose.model("usuarios", usuarioSchema);