const { v4: uuidv4 } = require('uuid');
const path = require('path')

const cargarArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    //Usaremos promises porque al tener mucho código quiero determinar cuando sale bien y cuando sale mal
    return new Promise((resolve, reject) => {
        // Desestructuramos el archivo que viene en la request
        const { archivo } = files;

        //Saber la extensión del archivo
        const nomArchivo = archivo.name.split('.');
        const extension = nomArchivo[nomArchivo.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(`Solo se reciben archivos de tipo ${extensionesValidas}`);
        }

        //Le damos un nombre único al archivo
        const nomUnico = uuidv4() + '.' + extension;

        //Le doy un path donde quiero que guarde los archivos
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nomUnico);

        // Usamos el método mv() para mover el archivo en el path que le dimos anteriormente
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(`Archivo ${nomUnico} subido con exito.`);
        });
    })



}

module.exports = {
    cargarArchivo,
}