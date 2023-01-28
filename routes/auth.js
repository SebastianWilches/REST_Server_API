const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/authController");
const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
router.post('/login', [
    check('correo', 'El campo de correo no puede estar vacio').notEmpty(),
    check('correo', 'El campo de correo no es valido').isEmail(),
    check('password', 'El campo de password no puede estar vacio').notEmpty(),
    validarUsuario //Este es el que recoge todas las validaciones que no cumplen con los req.
], login);

module.exports = router;