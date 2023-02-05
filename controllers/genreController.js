const { request, response } = require("express");

const Genero = require('../models/Genero');





const getGenres = async (req = request, res = response) => {

    const { limiteInferior = 0, limiteSuperior = 9999 } = req.query;
    const query = { estado: true }

    //Busqueda con paginación
    const [countGenres, genres] = await Promise.all([
        Genero.count(query),
        Genero.find(query)
            .skip(limiteInferior)
            .limit(limiteSuperior)
            .populate('usuario')
    ])

    res.status(200).json({
        genres,
        countGenres
    })
}


const getGenre = async (req = request, res = response) => {
    const { id } = req.params;

    const genero = await Genero.findById(id).populate("usuario");

    res.status(200).json({
        genero
    })
}


const createGenre = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const uid = req.uid;
    const usuarioAutenticado = req.usuarioAutenticado;

    //Mirar si el género ya está creado
    const genreDB = await Genero.findOne({ nombre: nombre });

    if (genreDB) {
        return res.status(400).json({
            msg: `El género musical ya existe en la base de datos.`
        });
    }

    //Generar la información del registro a crear
    const data = {
        usuario: req.uid, //Esta viene desde que validamos la JWT 
        nombre,
        uid,
        usuarioAutenticado
    }
    const genero = new Genero(data);
    await genero.save();

    return res.status(200).json({
        msg: 'POST API',
        genero
    })

}

const updateGenre = async (req = request, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    const usuarioAutenticado = req.usuarioAutenticado;

    const { _id, estado, usuario, ...data } = req.body //Extraemos lo que no queremos que sea modificado.

    data.nombre = data.nombre.toUpperCase();


    const updateGenre = await Genero.findByIdAndUpdate(id, data);

    res.status(201).json({
        msg: 'El género ha sido actualizado.',
        updateGenre,
        uid: `ID del admin que efectuó la acción: ${uid}`,
        usuarioAutenticado
    })
}
//borrar categoria - cambiar el estado a false
const deleteGenre = async (req = request, res = response) => {
    
    const {id} = req.params;
    const uid = req.uid;
    const usuarioAutenticado = req.usuarioAutenticado;

    const deleteGenre = await Genero.findByIdAndUpdate(id, {estado: false});

    res.status(201).json({
        msg: 'El género ha sido borrado.',
        deleteGenre,
        uid: `ID del admin que efectuó la acción: ${uid}`,
        usuarioAutenticado
    })
}



module.exports = {
    createGenre,
    getGenres,
    getGenre,
    updateGenre,
    deleteGenre
}