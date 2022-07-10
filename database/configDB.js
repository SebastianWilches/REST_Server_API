const mongoose = require('mongoose')


const DBConnection = async () => {


    try {
        await mongoose.connect(process.env.Conexion_MONGODB_ATLAS);

        console.log('Conexión a la BD exitosa');

    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar la BD');
    }
}

module.exports = {
    DBConnection
}