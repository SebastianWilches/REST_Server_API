const { request, response } = require('express');

const Album = require('../models/Album');


//Get Paginado - Público
const getAlbums = async (req = request, res = response) => {

    const { limiteInferior = 0, limiteSuperior = 9999 } = req.query;
    const query = { estado: true }

    //Busqueda con paginación
    const [countAlbums, albums] = await Promise.all([
        Album.count(query),
        Album.find(query)
            .skip(limiteInferior)
            .limit(limiteSuperior)
            .populate('usuarioFK')
            .populate('generoFK')
    ])

    res.status(200).json({
        albums,
        countAlbums
    })
}

const getAlbum = async (req = request, res = response) => {
    const { id } = req.params;

    const album = await Album.findById(id)
        .populate('usuarioFK')
        .populate('generoFK');

    res.status(200).json({
        album
    })
}

const createAlbum = async (req = request, res = response) => {
    const { nombre, generoFK, precio, duracion, descripcion, stock, imagen } = req.body;
    const uid = req.uid;
    const usuarioAutenticado = req.usuarioAutenticado;

    const data = {
        nombre: nombre.toLowerCase(),
        usuarioFK: uid,
        generoFK,
        precio,
        duracion,
        descripcion,
        stock,
        imagen
    }

    const album = new Album(data);
    await album.save();

    res.status(200).json({
        msg: 'POST ALBUM',
        album,
        usuarioAutenticado: `El usuario con el ID ${uid} efectuo la acción`
    })
}

const updateAlbum = async (req = request, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    const usuarioAutenticado = req.usuarioAutenticado;

    const { _id, estado, ...data } = req.body; //Extraemos lo que no se quiere modificar

    data.nombre = data.nombre.toLowerCase();

    const updateAlbum = await Album.findByIdAndUpdate(id, data);

    res.status(200).json({
        msg: 'El álbum músical ha sido actualizado.',
        updateAlbum,
        uid: `ID del admin que efectuó la acción: ${uid}`,
        usuarioAutenticado
    })

}

const deleteAlbum = async(req = request, res = response) => {
    const {id} = req.params;
    const uid = req.uid;
    const usuarioAutenticado = req.usuarioAutenticado;

    const deleteAlbum = await Album.findByIdAndUpdate(id, {estado:false});

    res.status(200).json({
        msg:'El álbum ha sido borrado.',
        deleteAlbum,
        uid: `ID del admin que efectuó la acción: ${uid}`,
        usuarioAutenticado
    })

}

module.exports = {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
}