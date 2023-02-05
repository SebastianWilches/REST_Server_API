const { Schema, model } = require('mongoose')

const SchemaAlbum = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del álbum es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuarioFK:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required:true
    },
    generoFK:{
        type: Schema.Types.ObjectId,
        ref: 'Generos',
        required:true
    },
    precio:{
        type:Number,
        required:[true, 'El valor del álbum es obligatorio'],
    },
    duracion:{
        type: String,
        required: [true, 'La duración del álbum es obligatoria']
    },
    descripcion:{
        type: String,
        default: 'No hay descripción disponible'
    },
    stock:{
        type: Number,
        default: 0
    },
    imagen:{
        type: String
    }
})


module.exports = model ('Albums', SchemaAlbum);
