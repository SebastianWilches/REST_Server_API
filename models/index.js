//Esto se hace para evitar hacer tantos imports a futuro.

const Usuario = require('../models/Usuario');
const Genero = require('../models/Genero');
const Server = require('../models/Server');
const Rol = require('../models/Rol');


module.exports = {
    Usuario,
    Genero,
    Server,
    Rol,
}