const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;


    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            return res.status(400).json({
                msg: "El correo no existe",
            });
        }

        //Verificar si el user está activo
        if( !usuario.estado){
            return res.status(400).json({
                msg: "El usuario esta inactivo",
            });
        }

        //Verificar si la contraseña es correcta
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "La contraseña es incorrecta",
            });
        }
        

        //Generar el JWT (Es await porque la función devuelve una promesa)
        const token = await generarJWT(usuario.id);



        res.json({
            msg: "TEST Response",
            usuario,
            token
        })


    } catch (error) { //Se espera que nunca se llegue a esta instancia
        console.log(error);
        return res.status(500).json({
            msg: "ERROR en backend",
        });
    }


}

module.exports = {
    login,
}