const { request, response } = require('express');
const { cargarArchivo } = require('../helpers');
const { Usuario, Album } = require('../models')


const uploadFile = async (req = request, res = response) => {

    //Validación: Si no viene ningun archivo, su longitud es 0 o el archivo no tiene el nombre correcto -> ERROR
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No se ha cargado ningún archivo.'
        });
    }

    try {
        const resultCargarArchivo = await cargarArchivo(req.files, undefined, 'img');
        res.status(201).json({
            msg: resultCargarArchivo
        })

    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

const updateFile = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    //Buscar el registro
    switch (coleccion) {
        case 'user':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un registro con el ID: ${id}`,
                })
            }
            break;

        case 'album':
            modelo = await Album.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un registro con el ID: ${id}`,
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: `Aún no existe una busqueda disponible para ${coleccion}`,
            })
    }

    //Actualizar el registro
    const resultCargarArchivo = await cargarArchivo(req.files, undefined, coleccion);
    modelo.imagen = resultCargarArchivo;
    await modelo.save();

    res.status(200).json({
        resultCargarArchivo
    })

}

module.exports = {
    uploadFile,
    updateFile
}