const { request, response } = require('express');
const { cargarArchivo } = require('../helpers');


const uploadFile = async (req = request, res = response) => {

    //Validación: Si no viene ningun archivo, su longitud es 0 o el archivo no tiene el nombre correcto -> ERROR
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No se ha cargado ningún archivo.'
        });
    }

    const resultCargarArchivo = await cargarArchivo(req.files);

    res.status(201).json({
        msg: resultCargarArchivo
    })

}

module.exports = {
    uploadFile
}