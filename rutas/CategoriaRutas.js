// Express posee un enrutador
const CategoriaOperaciones = require("../operaciones/CategoriaOperaciones");
const router = require("express").Router();

router.get("/", CategoriaOperaciones.consultarCategorias); // Primero: Ruta a utilizar, Segundo: el metodo para ejecutar una funcion CRUD
router.get("/:id", CategoriaOperaciones.consultarCategoria);
router.post("/", CategoriaOperaciones.crearCategorias);
router.put("/:id", CategoriaOperaciones.modificarCategoria);
router.delete("/:id", CategoriaOperaciones.eliminarCategoria);

module.exports = router;