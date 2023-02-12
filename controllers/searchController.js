const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Album, Genero, Rol } = require('../models');


//Para las verificaciones
const coleccionesPermitidas = [
    'album',
    'genre',
    'role',
    'user'
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

const searchAlbum = async (termino = '', res = response) => {

    //Busqueda por ID
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const album = await Album.findById(termino);


        return res.status(201).json({
            results: (album) ? [album] : []
        })
    }

    //Busqueda por el termino
    const regex = new RegExp(termino, 'i');

    const album = await Album.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }]
    });

    res.status(200).json({
        results: album,
    })
}

const searchGenre = async (termino = '', res = response) => {

    //Busqueda por ID
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const genre = await Genero.findById(termino);


        return res.status(201).json({
            results: (genre) ? [genre] : []
        })
    }

    //Busqueda por el termino
    const regex = new RegExp(termino, 'i');

    const genre = await Genero.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.status(200).json({
        results: genre,
    })
}

const searchRole = async (termino = '', res = response) => {

    //Busqueda por ID
    const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const rol = await Rol.findById(termino);


        return res.status(201).json({
            results: (rol) ? [rol] : []
        })
    }

    //Busqueda por el termino
    const regex = new RegExp(termino, 'i');

    const rol = await Rol.find({ rol: regex });

    res.status(200).json({
        results: rol,
    })
}

const search = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
        })
    };


    switch (coleccion) {
        case 'album':
            searchAlbum(termino, res);
            break;
        case 'genre':
            searchGenre(termino, res);
            break;
        case 'role':
            searchRole(termino, res);
            break;
        case 'user':
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