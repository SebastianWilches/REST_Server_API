const { request, response } = require("express")

const validarAdminRol = (req = request, res = response, next) => {

    const usuarioAutenticado = req.usuarioAutenticado;

    if (!usuarioAutenticado) {
        res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token del usuario',
        })
    }

    const { nombre, rol } = usuarioAutenticado;

    if (rol !== 'ADMIN') {
        res.status(401).json({
            msg: `${nombre} no tiene el rol de administrador.`
        });
    }


    next();
}

const validarRoles = (...roles) => {

    return (req = request, res = response, next) => {
        const usuarioAutenticado = req.usuarioAutenticado;

        if (!usuarioAutenticado) {
            res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token del usuario',
            })
        }

        if (!roles.includes(usuarioAutenticado.rol)) {
            res.status(401).json({
                msg: `Para acceder a este servicio se requiere uno de estos roles: ${roles}`,
            })
        }

        next();
    }

}

module.exports = {
    validarAdminRol,
    validarRoles
}