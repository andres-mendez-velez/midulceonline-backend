const UsuarioModelo = require("../modelos/UsuarioModelo");
const UsuarioOperaciones = {};

UsuarioOperaciones.crearUsuario = async (req, res) => {
    try {
        const objeto = req.body;
        const usuario = new UsuarioModelo(objeto);
        const usuarioGuardado = await usuario.save();
        res.status(201).send(usuarioGuardado);
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
};

UsuarioOperaciones.consultarUsuarios = async (req, res) => {
    try {
        const filtro = req.query;
        let listaUsuarios;
        if (filtro.q != null) {
            listaUsuarios = await UsuarioModelo.find({
                "$or": [
                    { "nombres": { $regex: filtro.q, $options: "i" } },
                    { "apellidos": { $regex: filtro.q, $options: "i" } }
                ]
            });
        } else {
            listaUsuarios = await UsuarioModelo.find(filtro);
        }
        if (listaUsuarios.length > 0) {
            res.status(200).send(listaUsuarios);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
};

UsuarioOperaciones.consultarUsuario = async (req, res) => {
    try {
        const id = req.params.id; // Los params son los parametros que se envian en la url: ..../id=123
        const usuario = await UsuarioModelo.findById(id);
        if (usuario != null) {
            res.status(200).send(usuario); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
        } else {
            res.status(404).send("No hay datos."); // Generar status 404 = No encontrado y, enviar un mensaje a la pagina
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error); // Peticion mal hecha
    }
};

UsuarioOperaciones.modificarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const usuario = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            direccion: body.direccion,
            telefono: body.telefono,
            correo: body.correo,
            password: body.password
        };
        console.log(usuario);
        const usuarioActualizado = await UsuarioModelo.findByIdAndUpdate(id, usuario, { new: true });
        if (usuarioActualizado != null) {
            res.status(200).send(usuarioActualizado);
        } else {
            res.status(404).send("No hay datos.");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
};

UsuarioOperaciones.eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioBorrado = await UsuarioModelo.findByIdAndDelete(id);
        res.status(200).send(usuarioBorrado);
    } catch (error) {
        res.status(400).send("Mala petición " + error);
    }
};

// Exportacion del archivo:
module.exports = UsuarioOperaciones;