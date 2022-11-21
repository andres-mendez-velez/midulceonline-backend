const CompraOperaciones = require("../operaciones/CompraOperaciones");
const router = require("express").Router();

router.get("/", CompraOperaciones.consultarCompras);
router.get("/:id", CompraOperaciones.consultarCompra);
router.post("/", CompraOperaciones.crearCompra);
router.put("/:id", CompraOperaciones.modificarCompra);
router.delete("/:id", CompraOperaciones.eliminarCompra);

module.exports = router;