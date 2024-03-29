const Album = require('../models/Album');
const Genero = require('../models/Genero');
const Roles = require('../models/Rol');
const Usuario = require('../models/Usuario')

/**
 * ROLES
 */
const RolValidator = async (rol = '') => {
    const existeRol = await Roles.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }

}
/**
 * USUARIO
 */
const ExisteEmailValidator = async (correo = '') => {
    //Verificamos si el correo ya existe en la BD
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD`);
    }
}

const ExisteID_BD = async (id = '') => {
    const ExisteID = await Usuario.findById(id);
    if (!ExisteID) {
        throw new Error(`El ID '${id}' no existe en la BD`);
    }
}

/**
 * GÉNERO
 */
const isIDGenre = async (id = '') => {
    const isIDGenre = await Genero.findById(id);
    if(!isIDGenre){
        throw new Error(`El ID '${id}' no existe en la BD`);
    }
}

/**
 * ÁLBUM
 */
const isIDAlbum = async (id='')=>{
    const isIDAlbum = await Album.findById(id);

    if(!isIDAlbum){
        throw new Error(`El ID '${id}' no existe en la BD`);
    }
}


module.exports = {
    RolValidator,
    ExisteEmailValidator,
    ExisteID_BD,
    isIDGenre,
    isIDAlbum
}