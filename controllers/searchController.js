const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario } = require('../models');


//Para las verificaciones
const coleccionesPermitidas = [
    "albums",
    "generos",
    "roles",
    "usuarios"
]

const searchUser = async (termino = '', res = response) => {

    //Primero vamos a diferenciar si por el req param nos estan enviando un MongoID para buscar por el UID o por un campo cualquiera


    const isMongoID = ObjectId.isValid(termino) //Si es un ID valido de Mongo devuelve true

    //Busqueda por ID
    if (isMongoID) {
        const usuario = await Usuario.findById(termino);

        //Si hay resultados que me devuelva un array, de lo contrario que el array este vacío
        return res.status(201).json({
            results: (usuario) ? [usuario] : []
        })
    }


    //Busqueda por el termino
    const regex = new RegExp(termino, 'i') //Con una expresión regular, le voy a poner que sea insensible a las mayúsculas o a las minúsculas

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }, { rol: regex }],
        $and: [{ estado: true }]
    });
    res.status(200).json({
        results: usuarios,
    })



}

const search = (req = request, res = response) => {

    const { coleccion, termino } = req.params;
    console.log(coleccion, termino);

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
        })
    };


    switch (coleccion) {
        case 'albums':
            break;
        case 'generos':
            break;
        case 'roles':
            break;
        case 'usuarios':
            searchUser(termino, res);
            break;
        default:
            res.status(500).json({
                msg: `Aún no existe una busqueda disponible para ${coleccion}`,
            })
    }
}

module.exports = {
    search,
}