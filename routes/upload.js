const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile, updateFile } = require("../controllers/uploadController");

const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
router.post('/', uploadFile);

router.put('/:coleccion/:id',[
    check('id', 'El ID es obligatorio.').notEmpty(),
    check('id', 'El ID no es un ID de mongo válido.').isMongoId(),
    check('coleccion', 'La colección no es válida').isIn(['album','user']),
    validarUsuario,
],updateFile);


module.exports = router;