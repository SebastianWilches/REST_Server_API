const { request, response } = require("express");

const Genero = require('../models/Genero');

const createGenre = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    //Mirar si el género ya está creado
    const genreDB = await Genero.findOne({nombre: nombre});

    if(genreDB){
        return res.status(400).json({
            msg:`El género musical ya existe en la base de datos.`
        });
    }

    //Generar la información del registro a crear
    const data = {
        usuario: req.uid, //Esta viene desde que validamos la JWT 
        nombre
    }
    const genero = new Genero(data);
    await genero.save();

    return res.status(200).json({
        msg:'POST API',
        genero
    })
    
}

module.exports = {
    createGenre
}