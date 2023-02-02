const { Router } = require("express");
const { check } = require("express-validator");

const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
//Obtener todos los géneros - público
router.get('/', (req, res) => {
    res.status(200).json({
        msg:'GET',
    })
});

//Obtener género por ID - público
router.get('/:id', (req, res) => {
    res.status(200).json({
        msg:'GET con ID',
    })
});

//Crear un género - privado (Cualquier persona con un token válido)
router.post('/', (req, res) => {
    res.status(200).json({
        msg:'POST',
    })
});

//Actualizar un género - privado (Cualquier persona con un token válido)
router.put('/:id', (req, res) => {
    res.status(200).json({
        msg:'PUT con ID',
    })
});

//Borrar un género - privado (Solo si tiene el rol ADMIN)
router.delete('/:id', (req, res) => {
    res.status(200).json({
        msg:'BORRAR con ID',
    })
});

module.exports = router;