const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombres: { type: String, maxLength: 80, required: true },
    apellidos: { type: String, maxLength: 80, required: true},
    direccion: { type: String, maxLength: 200, required: true},
    telefono: { type: String, maxLength: 20, required: true},
    correo: { type: String, maxLength: 100, required: true}
});

module.exports = mongoose.model("usuarios", usuarioSchema);