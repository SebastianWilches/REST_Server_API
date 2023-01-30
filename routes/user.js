const { Router } = require("express");
const { check } = require("express-validator");
const { userGET, userPUT, userPOST, userDELETE } = require("../controllers/userController");
const { RolValidator, ExisteEmailValidator, ExisteID_BD } = require("../helpers/db-validator");

const { validarJWT, validarAdminRol, validarRoles, validarUsuario } = require('../middlewares/index');


const router = Router();

//PETICIONES
//GET
router.get('/', userGET);

//PUT
router.put('/:id', [
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para ese ID').custom(ExisteID_BD),
    check('rol', 'El rol no es valido').custom(RolValidator),


    validarUsuario
], userPUT); //Esto es para mandarlo por parametro el id

//POST
router.post('/', [
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'Este correo ya existe en la BD').custom(ExisteEmailValidator),
    // check('rol', 'El rol no es valido').isIn(['ADMIN','USER']), Esta validación es sin refactorizar
    check('rol', 'El rol no es valido').custom(RolValidator), //Esta validación es comparando con unos datos en nuestra BD de la colección roles

    validarUsuario
], userPOST); //Si existen 3 parametros, el segundo lo pasara como un middleware (Ejemplo: Usar un validator)

//DELETE
router.delete('/:id', [
    validarJWT,
    // validarAdminRol,
    validarRoles('ADMIN', 'SELLER'),
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id', 'No existe una coincidencia para ese ID').custom(ExisteID_BD),

    validarUsuario
], userDELETE);


module.exports = router;