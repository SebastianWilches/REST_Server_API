const { response, request } = require('express');
var bcrypt = require('bcryptjs');
//Importacion modelo de usuarios (BD)
const Usuario = require('../models/Usuario');




const userGET = async (req = request, res = response) => {

    //Hacemos la desestructuración para obtener los limites del query
    const { limiteSuperior = 10, limiteInferior = 0 } = req.query;
    const query = { estado: true }

    //Como las dos promises no dependen una de la otra, las ejecuto de forma simultanea
    //pero ambas se tienen que cumplir antes de salir de ese await

    //Una vez tenga los resultados aplico una desestructuración de arreglos para obtener los resultados
    const [contarUsuarios, usuariosBD] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(limiteInferior).limit(limiteSuperior)]);


    res.status(200).json({
        msg: 'Get API',
        contarUsuarios,
        usuariosBD
    })
}

const userPUT = async (req = request, res = response) => {

    const { id } = req.params //Recibimos el parametro que le mandamos por la ruta
    const { _id, password, google, correo, ...resto } = req.body; //Extraigo lo que no necesito actualizar

    //Si viene una nueva contraseña que la encripte
    if (password) {
        //Encriptamos la contraseña
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const updateUsuarioBD = await Usuario.findByIdAndUpdate(id, resto);

    res.status(201).json({
        msg: 'Put API',
        updateUsuarioBD
    })
}

const userPOST = async (req = request, res = response) => {

    const { nombre, correo, password, rol, estado } = req.body; //Desestructurar aqui es util porque podemos recibir solo lo que nos interese, el resto lo va a ignorar

    //Creamos una instancia del usuario de nuestro modelo
    const usuario = new Usuario({ nombre, correo, password, rol, estado }); //Moongose ignora los parametros que no esten en el schema


    //Encriptamos la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(usuario.password, salt);


    //Guardamos la instancia en mongoose
    await usuario.save(); //La instancia debe tener los parametros obligatorios que pide el schema


    res.status(201).json({
        msg: 'Post API',
        usuario
    })
}

const userDELETE = async(req = request, res = response) => {
    const { id } = req.params;

    const uid = req.uid; //Es la que agregamos en la validación del JWT
    const usuarioAutenticado = req.usuarioAutenticado; //Es la que agregamos en la validación del JWT

    // const usuario = await Usuario.findByIdAndDelete(id); //Lo borra por COMPLETO de la BD

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}); //Cambiaremos el estado que tiene en la BD para listarlo o no

    res.status(200).json({
        msg: 'Delete API',
        usuario,
        uid: `ID del admin que efectuó la acción: ${uid}`,
        usuarioAutenticado
    })
}

module.exports = {
    userGET,
    userPUT,
    userPOST,
    userDELETE
}