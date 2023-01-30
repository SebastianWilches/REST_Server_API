
const validarJWT = require("../middlewares/validarJWT");
const validarRoles = require("../middlewares/validarRol");
const validarUsuario = require("../middlewares/validarUsuarios");

module.exports = {
    ...validarJWT,
    ...validarRoles,
    ...validarUsuario,
}