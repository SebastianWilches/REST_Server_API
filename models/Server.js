//HTTP
const cors = require('cors')
const express = require('express');
const fileUpload = require('express-fileupload');
const { DBConnection } = require('../database/configDB');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            userRoute: '/api/user',
            authRoute: '/api/auth',
            genreRoute: '/api/genre',
            albumRoute: '/api/album',
            searchRoute: '/api/search',
            uploadRoute: '/api/upload',
        }

        //Conexion base de datos
        this.conectarBD();

        //Midlewares = Van a agregar otra funcionalidad al WebServer
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarBD() {
        await DBConnection();
    }

    middlewares() {
        //Middleware para CORS
        this.app.use(cors())

        //Lectura del body (Cuando hagamos petición POST)
        this.app.use(express.json());

        //Para que use un directorio publico
        this.app.use(express.static('public'));

        //Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }


    routes() {
        //Middleware para rutas
        this.app.use(this.paths.userRoute, require('../routes/user'));
        this.app.use(this.paths.authRoute, require('../routes/auth'));
        this.app.use(this.paths.genreRoute, require('../routes/genre'));
        this.app.use(this.paths.albumRoute, require('../routes/album'));
        this.app.use(this.paths.searchRoute, require('../routes/search'));
        this.app.use(this.paths.uploadRoute, require('../routes/upload'));
        
    }

    start() {
        this.app.listen(this.port, () => console.log(`Server corriendo en el puerto ${this.port}`));
    }
}

module.exports = {
    Server
}