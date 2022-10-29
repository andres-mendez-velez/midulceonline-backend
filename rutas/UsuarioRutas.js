const UsuarioOperaciones = require("../operaciones/UsuarioOperaciones");
const router = require("express").Router();

router.get("/", UsuarioOperaciones.consultarUsuarios);
router.get("/:id", UsuarioOperaciones.consultarUsuario);
router.post("/", UsuarioOperaciones.crearUsuario);
router.put("/:id", UsuarioOperaciones.modificarUsuario);
router.delete("/:id", UsuarioOperaciones.eliminarUsuario);

module.exports = router;