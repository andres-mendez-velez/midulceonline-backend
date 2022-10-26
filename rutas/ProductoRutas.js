const ProductoOperaciones = require("../operaciones/ProductoOperaciones");
const router = require("express").Router();

router.get("/", ProductoOperaciones.consultarProductos); // Primero: Ruta a utilizar, Segundo: el metodo para ejecutar una funcion CRUD
router.get("/:id", ProductoOperaciones.consultarProducto);
router.post("/", ProductoOperaciones.crearProducto);
router.put("/:id", ProductoOperaciones.modificarProducto);
router.delete("/:id", ProductoOperaciones.eliminarProducto);

module.exports = router;