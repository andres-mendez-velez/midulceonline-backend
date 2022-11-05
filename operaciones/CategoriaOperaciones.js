// METODOS CRUD PARA LA COLECCION DE CATEGORIAS.

const CategoriaModelo = require("../modelos/CategoriaModelo"); // Importacion del modelo.
const CategoriaOperaciones = {}; // Objeto para guardar todos los metodos CRUD para la coleccion de categorias.

CategoriaOperaciones.crearCategorias = async (req, res) => {
    try {
        const objeto = req.body; // Obtener la informacion desde el body
        const categoria = new CategoriaModelo(objeto);
        const categoriaGuardada = await categoria.save();
        res.status(201).send(categoriaGuardada); // 201 => Se pudo crear la información encargada
    } catch (error) {
        if (error.code === 11000) res.status(400).json({tipoError: "dato duplicado", dato: error.keyValue}); // 11000 es el codigo de error cuando se intenta crear un objeto con una clave unica que ya existe
    }
};

CategoriaOperaciones.consultarCategorias = async (req, res) => {
    try {
        const filtro = req.query;
        let listaCategorias;
        if (filtro.q != null) {
            listaCategorias = await CategoriaModelo.find({
                "$or": [
                    { "nombre": { $regex: filtro.q, $options: "i" } },
                    { "descripcion": { $regex: filtro.q, $options: "i" } }
                ]
            });
        }
        else {
            listaCategorias = await CategoriaModelo.find(filtro);
        }
        if (listaCategorias.length > 0) {
            res.status(200).send(listaCategorias); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
        } else {
            res.status(404).send("No hay datos"); // Generar status 404 = No encontrado y, enviar un mensaje a la pagina
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error); // Peticion mal hecha
    }
}; // Como los metodos trabajan con el protocolo http se va a estar haciendo request y response, ademas de que al usarse una conexion a un BD estos metodos son promises

CategoriaOperaciones.consultarCategoria = async (req, res) => {
    try {
        const id = req.params.id; // Los params son los parametros que se envian en la url: ..../id=123
        const categoria = await CategoriaModelo.findById(id);
        if (categoria != null) {
            res.status(200).send(categoria); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
        } else {
            res.status(404).send("No hay datos."); // Generar status 404 = No encontrado y, enviar un mensaje a la pagina
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error); // Peticion mal hecha
    }
};

CategoriaOperaciones.modificarCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const categoria = {
            nombre: body.nombre,
            disponible: body.disponible,
            descripcion: body.descripcion,
            imagen: body.imagen
        };
        console.log(categoria);
        const categoriaActualizada = await CategoriaModelo.findByIdAndUpdate(id, categoria, { new: true });
        if (categoriaActualizada != null) {
            res.status(200).send(categoriaActualizada);
        } else{
            res.status(404).send("No hay datos.");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
};

CategoriaOperaciones.eliminarCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const categoriaBorrada = await CategoriaModelo.findByIdAndDelete(id);
        if (categoriaBorrada != null) {
            res.status(200).send(categoriaBorrada);
        }
        else {
            res.status(404).send("No hay datos.")
        }
    } catch (error) {
        res.status(400).send("Mala petición " + error);
    }
};

// Exportacion del archivo:
module.exports = CategoriaOperaciones;