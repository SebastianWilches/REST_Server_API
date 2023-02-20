const { request, response } = require('express');
const { cargarArchivo } = require('../helpers');
const { Usuario, Album } = require('../models');
const path = require('path');
const fs = require('fs')


const uploadFile = async (req = request, res = response) => {


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

    //Limpiar imágenes anteriores
    if (modelo.imagen) {
        //Borramos la imagen que esta en el servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    //Actualizar el registro
    const resultCargarArchivo = await cargarArchivo(req.files, undefined, coleccion);
    modelo.imagen = resultCargarArchivo;
    await modelo.save();

    res.status(200).json({
        resultCargarArchivo
    })

}

const getFile = async (req = request, res = response) => {
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

    //Miramos si el registro tiene una imagen
    if (modelo.imagen) {
        //Devolvemos el path de la imagen que está en el Server
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }


    //Enviamos una imagen por default en caso de que el registro consultado no tenga
    const pathPlaceHolder = path.join(__dirname, '../assets', '/no-image.jpg')
    res.sendFile(pathPlaceHolder);
}

module.exports = {
    uploadFile,
    updateFile,
    getFile
}