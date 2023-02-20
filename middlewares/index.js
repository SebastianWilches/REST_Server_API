
const validarJWT = require('../middlewares/validarJWT');
const validarRoles = require('../middlewares/validarRol');
const validarUsuario = require('../middlewares/validarUsuarios');
const validarArchivos = require('../middlewares/validarArchivos');

module.exports = {
    ...validarJWT,
    ...validarRoles,
    ...validarUsuario,
    ...validarArchivos
}