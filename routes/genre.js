const { Router } = require("express");
const { check } = require("express-validator");
const { createGenre, getGenres, getGenre, updateGenre, deleteGenre } = require("../controllers/genreController");
const { isIDGenre } = require("../helpers/db-validator");

const { validarJWT, validarUsuario, validarRoles } = require("../middlewares");


const router = Router();


//Obtener todos los géneros - público
router.get('/', getGenres);

//Obtener género por ID - público
router.get('/:id', [
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para el ID').custom(isIDGenre),
    validarUsuario
], getGenre);

//Crear un género - privado (Cualquier persona con un token válido)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre no puede estar vacío.').notEmpty(),
    validarUsuario,

], createGenre);

//Actualizar un género - privado (Cualquier persona con un token válido)
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para el ID').custom(isIDGenre),
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    validarUsuario
], updateGenre);

//Borrar un género - privado (Solo si tiene el rol ADMIN)
router.delete('/:id', [
    validarJWT,
    validarRoles('ADMIN'),
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para el ID').custom(isIDGenre),

    validarUsuario
], deleteGenre);

module.exports = router;