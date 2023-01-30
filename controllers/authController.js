const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleTokenValidator } = require('../helpers/googleToken-validator');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;


    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "El correo no existe",
            });
        }

        //Verificar si el user está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario esta inactivo",
            });
        }

        //Verificar si la contraseña es correcta
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
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


const googleSignIn = async (req = request, res = response) => {

    const { google_token } = req.body;

    try {

        // Basicamente vamos a validar esta token con Google
        // y asi poder obtener toda su información asociada
        const googleUser = await googleTokenValidator(google_token); //Await porque me devuelve una promesa

        const { email, email_verified, name, picture } = googleUser;
        console.log(email);

        //Aquí empezamos con validaciones que haremos en nuestra DB
        //1.Encontrar a un usuario con ese correo
        let usuario = await Usuario.findOne({ correo: email });
        console.log(usuario);

        if(!usuario){
            //Si no existe, tengo que crearlo
            const dataUsuario = {
                nombre: name,
                correo: email,
                password: 123456, //Estas tengo que cambiarlas despues
                rol: "ADMIN",
                imagen: picture
            }

            usuario = new Usuario(dataUsuario);
            await usuario.save();
        }

        //2. Si el usuario existe pero tiene un estado de false, negarle la entrada
        if(!usuario.estado){
            return res.status(401).json({
                msg:'El usuario no tiene acceso a la aplicación.'
            })
        }

        //3. Generamos el JWT
        const token = await generarJWT(usuario.id);

        res.status(201).json({
            usuario,
            token
        })


    } catch (error) {
        res.status(500).json({
            msg: 'Error en el backend.'
        })
    }

    res.status(201).json({
        msg: 'Se envia el Google Token',
        google_token
    })

}

module.exports = {
    login,
    googleSignIn
}