const { validationResult } = require('express-validator');

const validarUsuario = (req, res, next) => {
    //Vamos a extraer los resultados de la validación que hicimos en las rutas
    const errorsValidator = validationResult(req);
    if (!errorsValidator.isEmpty()) {
        return res.status(400).json(errorsValidator);
    }

    next();
}

module.exports = {
    validarUsuario
}