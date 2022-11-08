const ProductoModelo = require("../modelos/ProductoModelo");
const ProductoOperaciones = {};

ProductoOperaciones.crearProducto = async (req, res) => {
    try {
        const objeto = req.body;
        const producto = new ProductoModelo(objeto);
        const productoGuardado = await producto.save();
        res.status(201).send(productoGuardado);
    } catch (error) {
        res.status(400).send("Mala petición. " + error)
    }
};

ProductoOperaciones.consultarProductos = async (req, res) => {
    try {
        const filtro = req.query;
        let listaProductos;
        if (filtro.q != null) {
            listaProductos = await ProductoModelo.find({
                "$or": [
                    { "nombre": { $regex: filtro.q, $options: "i" } },
                    { "marca": { $regex: filtro.q, $options: "i" } },
                    { "keywords": { $regex: filtro.q, $options: "i" } },
                    { "categoria": { $regex: filtro.q, $options: "i" } }
                ]
            });
        } else {
            listaProductos = await ProductoModelo.find(filtro);
        }

        if (listaProductos.length > 0) {
            res.status(200).send(listaProductos);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
};

ProductoOperaciones.consultarProducto = async (req, res) => {
    try {
        const id = req.params.id; // Los params son los parametros que se envian en la url: ..../id=123
        const producto = await ProductoModelo.findById(id);
        if (producto != null) {
            res.status(200).send(producto); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error); // Peticion mal hecha
    }
};

ProductoOperaciones.modificarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const producto = {
            nombre: body.nombre,
            marca: body.marca,
            presentacion: body.presentacion,
            cantidad: body.cantidad,
            precio: body.precio,
            keywords: body.keywords,
            disponible: body.disponible,
            categoria: body.categoria,
            imagenes: body.imagenes
        };
        console.log(producto);
        const productoActualizado = await ProductoModelo.findByIdAndUpdate(id, producto, { new: true });
        if (productoActualizado != null) {
            res.status(200).send(productoActualizado);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
};

ProductoOperaciones.eliminarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const productoBorrado = await ProductoModelo.findByIdAndDelete(id);
        res.status(200).send(productoBorrado);
    } catch (error) {
        res.status(400).send("Mala petición " + error);
    }
};

// Exportacion del archivo:
module.exports = ProductoOperaciones;