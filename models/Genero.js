const { Schema, model } = require('mongoose')

const SchemaGenero = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del género es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId, //Tiene que ser un objeto que tengamos en Mongo
        ref: 'Usuarios', //Ponemos el nombre del esquema que tengamos en el modelo correspondiente
        required:true //Esto es porque para este caso, la relación es obligatoria
    }
})


module.exports = model ('Generos', SchemaGenero);
