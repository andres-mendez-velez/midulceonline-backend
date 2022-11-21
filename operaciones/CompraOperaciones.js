const CompraModelo = require("../modelos/CompraModelo");

const CompraOperaciones = {};

CompraOperaciones.crearCompra = async (req, res) => {
    try {
        const body = req.body;
        const compra = new CompraModelo(body);
        const compraGuardada = await compra.save();
        res.status(201).send(compraGuardada);
    } catch (error) {
        res.status(400).send("Petición mal hecha: " + error);
    }
}

CompraOperaciones.consultarCompras = async (req, res) => {
    try {
        const filtro = req.query;
        let listaCompras;
        if (filtro.q != null) {
            listaCompras = await CompraModelo.find({
                "$or": [
                    { "nombreUser": { $regex: filtro.q, $options: "i" } },
                    { "apellidoUser": { $regex: filtro.q, $options: "i" } },
                    { "documentoUser": { $regex: filtro.q, $options: "i" } },
                    { "direccionUser": { $regex: filtro.q, $options: "i" } },
                    { "correoUser": { $regex: filtro.q, $options: "i" } },
                    { "nombreProd": { $regex: filtro.q, $options: "i" } },
                    { "estadoCompra": { $regex: filtro.q, $options: "i" } }
                ]
            });
        } else {
            listaCompras = await CompraModelo.find(filtro);
        }
        res.status(200).send(listaCompras);
    } catch (error) {
        res.status(400).json(error);
    }
}

CompraOperaciones.consultarCompra = async (req, res) => {
    try {
        const id = req.params.id; // Los params son los parametros que se envian en la url: ..../id=123
        const compra = await CompraModelo.findById(id);
        res.status(200).send(compra); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
    } catch (error) {
        res.status(400).json(error); // Peticion mal hecha
    }
};

CompraOperaciones.modificarCompra = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const compra = {
            nombreUser: body.nombreUser,
            apellidoUser: body.apellidoUser,
            documentoUser: body.documentoUser,
            direccionUser: body.direccionUser,
            telefonoUser: body.telefonoUser,
            correo: body.correo,
            nombreProd: body.nombreProd,
            cantidadPedida: body.cantidadPedida,
            precioUnitario: body.precioUnitario,
            precioTotal: body.precioTotal,
            estadoCompra: body.estadoCompra
        };
        const compraActualizada = await CompraModelo.findByIdAndUpdate(id, compra, { new: true });
        if (compraActualizada != null) {
            res.status(200).send(compraActualizada);
        } else {
            res.status(404).send("No se encontraron datos.");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

CompraOperaciones.eliminarCompra = async (req, res) => {
    try {
        const id = req.params.id;
        const compraBorrada = await CompraModelo.findByIdAndDelete(id);
        if (compraBorrada != null) {
            res.status(200).send(compraBorrada);
        } else {
            res.status(404).send("No se encontraron datos.");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = CompraOperaciones;