const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombres: { type: String, maxLength: 40, required: true },
    apellidos: { type: String, maxLength: 40, required: true},
    direccion: { type: String, maxLength: 40, required: true},
    telefono: { type: String, maxLength: 20, required: true},
    correo: { type: String, maxLength: 20, required: true}
});

module.exports = mongoose.model("usuarios", usuarioSchema);