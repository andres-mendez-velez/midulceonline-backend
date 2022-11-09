const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombres: { type: String, maxLength: 80, required: true },
    apellidos: { type: String, maxLength: 80, required: true },
    documento: { type: String, maxLength: 15, required: true, unique: true },
    direccion: { type: String, maxLength: 200, required: true },
    telefono: { type: String, maxLength: 20, required: true },
    correo: { type: String, maxLength: 100, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

module.exports = mongoose.model("usuarios", usuarioSchema);