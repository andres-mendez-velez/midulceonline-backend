// METODOS CRUD PARA LA COLECCION DE CATEGORIAS.

const CategoriaModelo = require("../modelos/CategoriaModelo"); // Importacion del modelo.
const CategoriaOperaciones = {}; // Objeto para guardar todos los metodos CRUD para la coleccion de categorias.

CategoriaOperaciones.crearCategorias = async (req, res) => {
    try {
        const objeto = req.body; // Obtener la informacion desde el body
        //console.log(objeto);
        const categoria = new CategoriaModelo(objeto);
        const categoriaGuardada = await categoria.save();
        res.status(201).send(categoriaGuardada); // 201 => Se pudo crear la información encargada
    } catch (error) {
        res.status(400).send("Mala petición." + error);
    }
}

CategoriaOperaciones.consultarCategorias = async (req, res) => {
    try {
        const listaCategorias = await CategoriaModelo.find();
        if (listaCategorias.length > 0) {
            res.status(200).send(listaCategorias); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
        } else {
            res.status(404).send("No hay datos"); // Generar status 404 = No encontrado y, enviar un mensaje a la pagina
        }
    } catch (error) {
        res.status(400).send("Mala petición" + error); // Peticion mal hecha
    }
}; // Como los metodos trabajan con el protocolo http se va a estar haciendo request y response, ademas de que al usarse una conexion a un BD estos metodos son promises

CategoriaOperaciones.consultarCategoria = async (req, res) => {
    try {
        const id = req.params.id; // Los params son los parametros que se envian en la url: ..../id=123
        const categoria = await CategoriaModelo.findById(id);
        if (categoria != null) {
            res.status(200).send(categoria); // Generar status 200 = OK y, enviar la lista de categorias obtenidas
        } else {
            res.status(404).send("No hay datos"); // Generar status 404 = No encontrado y, enviar un mensaje a la pagina
        }
    } catch (error) {
        res.status(400).send("Mala petición" + error); // Peticion mal hecha
    }
};

// Exportacion del archivo:
module.exports = CategoriaOperaciones;