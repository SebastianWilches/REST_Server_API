//Importaciones node
//Paquetes
require('dotenv').config()
//Clases
const { Server } = require('./models/Server')


const server = new Server();


server.start();




