const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile } = require("../controllers/uploadController");

const { validarUsuario } = require("../middlewares/validarUsuarios");


const router = Router();

//PETICIONES
router.post('/', uploadFile);


module.exports = router;