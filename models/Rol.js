const { Schema, model } = require('mongoose')

const SchemaUsuario = Schema({
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})


module.exports = model ('Roles', SchemaUsuario);
