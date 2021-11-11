const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    CURP: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    edad: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    verificacion: {
        type: Boolean,
        default: false,
    },
    registro: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('Usuario', UsuariosSchema);