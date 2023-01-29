const { Schema, model } = require('mongoose')

const SchemaUsuario = Schema({
    nombre: { //El tipo de opciones que le podemos agregar a los schemas lo encontramos en SchemaTypes dentro de la documentación
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    autenticacionGoogle: {
        type: Boolean,
        default: false
    },

})

//Vamos a sobreescribir un metodo para cuando yo devuelva el usuario no me muestre password ni version
SchemaUsuario.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}



//Exportamos 
module.exports = model('Usuarios', SchemaUsuario) //El primer parametro es la colección, El segundo es el schema
//La analogia para entender esto seria, una coleccion de 'Usuarios' tienen la estructura de SchemaUsuario