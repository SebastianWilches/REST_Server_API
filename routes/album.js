const { Router } = require("express");
const { check } = require("express-validator");
const { getAlbums, createAlbum, getAlbum, updateAlbum, deleteAlbum } = require("../controllers/albumController");
const { isIDGenre, isIDAlbum } = require("../helpers/db-validator");
const { validarUsuario, validarJWT, validarRoles } = require("../middlewares");


const router = Router();

//Obtener todos los álbums - Público
router.get('/', getAlbums);

//Obtener álbum por ID - Público
router.get('/:id',[
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para el ID').custom(isIDAlbum),
    validarUsuario
], getAlbum)

//Crear un álbum - privado (Cualquier persona con un token válido)
router.post('/',[
    validarJWT,

    check('generoFK','La FK del género de música es obligatoria').notEmpty(),
    check('generoFK', 'La FK del género de música no es un ID de mongo valido').isMongoId(),
    check('generoFK', 'La FK del género de música no existe en la DB').custom(isIDGenre),

    validarUsuario
], createAlbum);

//Actualizar un género - privado (Cualquier persona con un token válido)
router.put('/:id',[
    validarJWT,

    check('id', 'El ID es obligatorio').notEmpty(),
    check('id', 'El ID no es un ID de mongo válido').isMongoId(),
    check('id', 'El ID no existe en la BD').custom(isIDAlbum),

    validarUsuario
], updateAlbum);

//Borrar un álbum- privado (Solo si tiene el rol ADMIN)
router.delete('/:id',[
    validarJWT,
    validarRoles('ADMIN'),

    check('id', 'El ID es obligatorio').notEmpty(),
    check('id', 'El ID no es un ID de mongo válido').isMongoId(),
    check('id', 'El ID no existe en la BD').custom(isIDAlbum),

    validarUsuario

], deleteAlbum);

module.exports = router;