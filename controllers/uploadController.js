const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const uploadFile = (req = request, res = response) => {

    //Validación: Si no viene ningun archivo, su longitud es 0 o el archivo no tiene el nombre correcto -> ERROR
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No se ha cargado ningún archivo.'
        });
    }

    // Desestructuramos el archivo que viene en la request
    const { archivo } = req.files;

    //Saber la extensión del archivo
    const nomArchivo = archivo.name.split('.');
    const extension = nomArchivo[nomArchivo.length - 1];

    //Validamos la extensión
    const extensionesValidas = [
        'png',
        'jpg',
        'jpeg',
        'gif'
    ]
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            msg: `Solo se reciben archivos de tipo ${extensionesValidas}`,
        })
    }

    //Le damos un nombre único al archivo
    const nomUnico = uuidv4() + '.' + extension;

    //Le doy un path donde quiero que guarde los archivos
    const uploadPath = path.join(__dirname, '../uploads', nomUnico);

    // Usamos el método mv() para mover el archivo en el path que le dimos anteriormente
    archivo.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).json({
                err
            });

        res.status(200).json({
            msg: `Archivo subido a ${uploadPath}.`
        });
    });
}

module.exports = {
    uploadFile
}