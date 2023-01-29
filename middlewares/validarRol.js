const { request, response } = require("express")

const validarAdminRol = (req = request, res = response, next) => {

    const usuarioAutenticado = req.usuarioAutenticado;

    if (!usuarioAutenticado) {
        res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token del usuario',
        })
    }

    const { nombre, rol } = usuarioAutenticado;

    if(rol !== 'ADMIN'){
        res.status(401).json({
            msg: `${nombre} no tiene el rol de administrador.`
        });
    }


    next();
}

module.exports = {
    validarAdminRol,
}