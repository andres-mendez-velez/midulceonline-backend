const UsuarioModelo = require("../modelos/UsuarioModelo");
const bcrypt = require("bcrypt");

const UsuarioOperaciones = {};

const cifrarPassword = async (password) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(password, salt);
}

UsuarioOperaciones.crearUsuario = async (req, res) => {
    try {
        const body = req.body;
        body.password = await cifrarPassword(body.password);
        const usuario = new UsuarioModelo(body);
        const usuarioGuardado = await usuario.save();
        res.status(201).send(usuarioGuardado);
    } catch (error) {
        res.status(400).json(error);
    }
}

UsuarioOperaciones.consultarUsuarios = async (req, res) => {
    try {
        const filtro = req.query;
        let listaUsuarios;
        if (filtro.q != null) {
            listaUsuarios = await UsuarioModelo.find({
                "$or": [
                    { "nombres": { $regex: filtro.q, $options: "i" } },
                    { "apellidos": { $regex: filtro.q, $options: "i" } },
                    { "documento": { $regex: filtro.q, $options: "i" } },
                    { "direccion": { $regex: filtro.q, $options: "i" } },
                    { "correo": { $regex: filtro.q, $options: "i" } },
                    { "telefono": { $regex: filtro.q, $options: "i" } }
                ]
            });
        } else {
            listaUsuarios = await UsuarioModelo.find(filtro);
        }
        res.status(200).send(listaUsuarios);
    } catch (error) {
        res.status(400).json(error);
    }
}

UsuarioOperaciones.consultarUsuario = async (req, res) => {
    try {
        const id = req.params.id; // Los params son los parametros que se envian en la url: ..../id=123
        const usuario = await UsuarioModelo.findById(id);
        res.status(200).send(usuario);
    } catch (error) {
        res.status(400).json(error); // Peticion mal hecha
    }
}

UsuarioOperaciones.modificarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (body.password != null) {
            body.password = await cifrarPassword(body.password);
        }
        const datosUsuario = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            documento: body.documento,
            direccion: body.direccion,
            telefono: body.telefono,
            correo: body.correo,
            password: body.password,
            admin: body.admin
        };
        const usuarioActualizado = await UsuarioModelo.findByIdAndUpdate(id, datosUsuario, { new: true });
        if (usuarioActualizado != null) {
            res.status(200).send(usuarioActualizado);
        } else {
            res.status(404).send("No se encontraron datos.");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

UsuarioOperaciones.eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioBorrado = await UsuarioModelo.findByIdAndDelete(id);
        res.status(200).send(usuarioBorrado); // Agregar if...
    } catch (error) {
        res.status(400).json(error);
    }
}

// Exportacion del archivo:
module.exports = UsuarioOperaciones;