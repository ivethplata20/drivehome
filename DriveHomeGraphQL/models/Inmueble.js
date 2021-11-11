const mongoose = require('mongoose');

const InmuebleSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        required: true,
        trim: true,
    },
    ciudadMunicipio: {
        type: String,
        required: true,
        trim: true,
    },
    calle: {
        type: String,
        required: true,
        trim: true,
    },
    NoExterior: { // No es Obligatorio
        type: String,
        trim: true,
    },
    NoInterior: { // No es Obligatorio
        type: String,
        trim: true,
    },
    codigoPostal: {
        type: String,
        required: true,
        trim: true,
    },
    pisos: {
        type: mongoose.Schema.Types.Number,
        required: true,
        trim: true,
    },
    banios: {
        type: mongoose.Schema.Types.Number,
        required: true,
        trim: true,
    },
    cuartos: {
        type: mongoose.Schema.Types.Number,
        required: true,
        trim: true,
    },
    cocina: {
        type: Boolean,
        required: true,
    },
    sala: {
        type: Boolean,
        required: true,
    },
    alberca: {
        type: Boolean,
        required: true,
    },
    escuelas: {
        type: Boolean,
        required: true,
    },
    supermercados: {
        type: Boolean,
        required: true,
    },
    deportivos: {
        type: Boolean,
        required: true,
    },
    centroscomerciales: {
        type: Boolean,
        required: true,
    },
    abarrotes: {
        type: Boolean,
        required: true,
    },
    hoteles: {
        type: Boolean,
        required: true,
    },
    parques: {
        type: Boolean,
        required: true,
    },
    playas: {
        type: Boolean,
        required: true,
    },
    VentaoRenta: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    valorPropiedad: {
        type: mongoose.Schema.Types.Number,
        required: true,
        trim: true,
    },
    plusvaliaCalculada: {
        type: mongoose.Schema.Types.Number,
        default: 0.0,
    },
    valorPropiedadNeto: {
        type: mongoose.Schema.Types.Number,
        default: 0.0,
    },
    verificacion: {
        type: Boolean,
        default: false,
    },
    publicacion: {
        type: Boolean,
        default: false,
    },
    comprado: {
        type: Boolean,
        default: false,
    },
    // Hasta Aqui se ve
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: undefined,
    },
    usuarios: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Usuario',
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    creado: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Inmueble',InmuebleSchema);