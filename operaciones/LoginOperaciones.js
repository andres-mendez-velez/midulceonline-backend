const UsuarioModelo = require("../modelos/UsuarioModelo");
const bcrypt = require("bcrypt");

const LoginOperaciones = {};

const compararPassword = async (input, saved) => {
    return await bcrypt.compare(input, saved);  // Devuelve true o false
}

LoginOperaciones.login = async (request, response) => {
    try {
        const correo = request.body.correo;
        let password = request.body.password;
        const usuario = await UsuarioModelo.findOne({correo: correo});  // Encontrar uno por correo
        if (usuario != null) {
            const result = await compararPassword(password, usuario.password);
            if (result) {
                const acceso = {
                    nombres: usuario.nombres + " " + usuario.apellidos,
                    admin: usuario.admin
                }
                response.status(200).json(acceso);
            } else {
                response.status(401).send("Datos incorrectos");
            }
        } else {
            response.status(401).send("Datos incorrectos");
        }
    } catch (error) {
        response.status(400).json(error);
    }
}

module.exports = LoginOperaciones;