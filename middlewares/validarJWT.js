const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('accessToken');

    if (!token) {
        res.status(401).json({
            msg: 'No se envió ningun token de acceso'
        })
    }

    try {

        //Aquí podemos extraer el uid del payload, porque es lo unico que dejamos allí cuando creamos el token
        const { uid } = jwt.verify(token, process.env.FirmaJWT);

        //Buscamos al usuario autenticado
        const usuarioAutenticado = await Usuario.findById(uid);
        if (!usuarioAutenticado) {
            res.status(401).json({
                msg:'El usuario que esta llamando al servicio no existe.'
            });
        }

        //Verificamos que el usuario que llame al servicio esta habilitado (estado:true)
        if (!usuarioAutenticado.estado) {
            res.status(401).json({
                msg:'El usuario que esta llamando al servicio no está habilitado.'
            });
        }

        //Como la request pasa por referencia, la agregamos a está.
        req.uid = uid; 
        req.usuarioAutenticado = usuarioAutenticado;


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token de acceso es invalido'
        })
    }

    next();

}

module.exports = {
    validarJWT,
}