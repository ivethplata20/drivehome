const Usuario = require('../models/Usuario');
const Inmueble = require('../models/Inmueble');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

// Crea y firma un JWT
const crearToken = (Usuario, secreta, expiresIn) => {
    const { id, email, nombre, telefono, verificacion, apellido, CURP, edad, usuario } = Usuario;

    return jwt.sign( { id, email, nombre, telefono, verificacion, apellido, CURP, edad, usuario }, secreta, { expiresIn } );
}

const resolvers = {
    Query: {
        obtenerInmuebles: async (_, {}, ctx) => {
            const inmuebles = await Inmueble.find({ creador: ctx.usuario.id });
            return inmuebles;
        },
        obtenerInmueblesTotales: async (_, {}, ctx) => {
            const principal = await Inmueble.find();
            const inmuebles = principal.filter(x => x.creador.toString() !== ctx.usuario.id.toString());
            return inmuebles;
        },
        obtenerInmueblesComprados: async (_, {}, ctx) => {
            const principal = await Inmueble.find({ comprador: ctx.usuario.id });
            const inmuebles = principal.filter(x => x.creador.toString() !== x.comprador.toString());
            return inmuebles;
        },
        obtenerSelecciones: async (_, {}, ctx) => {
            const inmuebles = await Inmueble.find({ usuarios: ctx.usuario.id });
            return inmuebles;
        },
        obtenerUsuario: async (_, {id}, ctx) => {
            const usuario = await Usuario.findById(ctx.usuario.id);
            return usuario;
        }
    },
    Mutation: {
        crearUsuario: async (_, {input}, ctx) => {
            const { CURP, telefono, email, usuario, password } = input;
            const existeCURP = await Usuario.findOne({ CURP });
            const existeTel = await Usuario.findOne({ telefono });
            const existeEmail = await Usuario.findOne({ email });
            const existeUsuario = await Usuario.findOne({ usuario });
            
            // Si el CURSP existe
            if ( existeCURP ) {
                throw new Error('El CURP ya esta registrado');
            }
            // Si el telefono existe
            if ( existeTel ) {
                throw new Error('El Telefono Celular ya esta registrado');
            }
            // Si el email existe
            if ( existeEmail ) {
                throw new Error('El Email ya esta registrado');
            }
            // Si el usuario existe
            if ( existeUsuario ) {
                throw new Error('El Nombre de Usuario ya esta registrado');
            }

            // Registrar en Base de Datos
            try {
                // Hashear Password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);
                // Registrar Nuevo Usuario
                const nuevoUsuario = new Usuario(input);
                nuevoUsuario.save();
                return "Usuario Creado Correctamente";
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_, {input}, ctx) => {
            const { email, password } = input;

            // Si el usuario Existe
            const existeUsuario = await Usuario.findOne({ email });
            
            if ( !existeUsuario ) {
                throw new Error('El usuario no existe');
            }

            // Si el password es Correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            
            if ( !passwordCorrecto ) {
                throw new Error('El password es incorrecto');
            }
            // Dar Acceso a la App
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '4hr'),
            }
        },
        actualizarUsuario: async (_, {id, input}, ctx) => {
            // Revisar si el usuario existe
            let usuario2 = await Usuario.findById(id);

            if(!usuario2) {
                throw new Error('Usuario no encontrado');
            }
            
            const { telefono, email, usuario3, password } = input;
            
            // Determinar que modifico y verificar datos
            if(telefono){
                const existeTel = await Usuario.findOne({ telefono });
                if ( existeTel ) {
                    throw new Error('El Telefono Celular ya esta registrado');
                }
            }
            if(email){
                const existeEmail = await Usuario.findOne({ email });
                if ( existeEmail ) {
                    throw new Error('El Email ya esta registrado');
                }
            }
            if(usuario3){
                const existeUsuario = await Usuario.findOne({ usuario3 });
                if ( existeUsuario ) {
                    throw new Error('El Nombre de Usuario ya esta registrado');
                }
            }
            if(password){
                // Hashear Password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);
            }
            
            // Guardar el Usuario
            usuario = await Usuario.findOneAndUpdate({_id: id}, input, {new:true});
            return usuario;
        },
        obetenerUsuarios: async (_, {id}, ctx) => {
            let inmueble = await Inmueble.findById(id);
            const usuarios = await Usuario.find();
            const usuario = [];
            inmueble.usuarios.forEach(x => {
                usuario.push(usuarios.filter(y => y.id.toString() === x.toString()));
            });
            return (usuario);
        },
        seleccionarInmueble: async (_, {id, input}, ctx) => {
            // Revisar si el inmueble existe
            let inmueble = await Inmueble.findById(id);

            if(!inmueble) {
                throw new Error('Inmueble no encontrado');
            }

            // Revisar si el usuario existe
            const usuario = inmueble.usuarios.filter(x => x.toString() === ctx.usuario.id.toString());

            if( usuario.length !== 0 ) {
                throw new Error('Seleccion ya registrada');
            }

            // Que no sea el creador
            if( ctx.usuario.id.toString() === inmueble.creador.toString() ) {
                throw new Error('Eres el dueño de esta propiedad');
            }

            // Agregar ID del Usuario al Inmueble
            inmueble.usuarios.push(ctx.usuario.id);
            
            // Guardar el Proyecto
            inmueble = await Inmueble.findOneAndUpdate({_id: id}, inmueble, {new:true});
            return "Inmueble Seleccionado";
        },
        eliminarSeleccion: async (_, {id, input}, ctx) => {
            // Revisar si el inmueble existe
            let inmueble = await Inmueble.findById(id);

            if(!inmueble) {
                throw new Error('Inmueble no encontrado');
            }

            // Revisar el registro existe
            const usuario = inmueble.usuarios.filter(x => x.toString() === ctx.usuario.id.toString());

            if( usuario.length !== 1 ) {
                throw new Error('Registro no existente');
            }

            // Determinar posicion del registro
            let pos = inmueble.usuarios.indexOf(ctx.usuario.id.toString());

            // Eliminar
            let elementoEliminado = inmueble.usuarios.splice(pos, 1);

            // Actualizar
            inmueble = await Inmueble.findOneAndUpdate({_id: id}, inmueble, {new:true});
            return "Registro Eliminado";
        },
        nuevoInmueble: async (_, {input}, ctx) => {
            try {
                const inmueble = new Inmueble(input);

                // Asociar el Creador
                inmueble.creador = ctx.usuario.id;
                inmueble.comprador = ctx.usuario.id;

                // Almacenarlo en la Base de Datos
                const resultado = await inmueble.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarInmueble: async (_, {id, input}, ctx) => {
            // Revisar si el inmueble existe
            let inmueble = await Inmueble.findById(id);

            if(!inmueble) {
                throw new Error('Inmueble no encontrado');
            }

            // Si la persona que trata de editarlo es el creador
            if(inmueble.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar este inmueble');
            }

            // Guardar el Proyecto
            inmueble = await Inmueble.findOneAndUpdate({_id: id}, input, {new:true});
            return inmueble;
        },
        eliminarInmueble: async (_, {id}, ctx) => {
            // Revisar si el proyecto existe
            let inmueble = await Inmueble.findById(id);

            if(!inmueble) {
                throw new Error('Inmueble no encontrado');
            }

            // Si la persona que trata de editarlo es el creador
            if(inmueble.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales para editar este inmueble');
            }

            // Eliminar
            await Inmueble.findOneAndDelete({_id: id});
            return "Inmueble Eliminado";
        }
    }
}

module.exports = resolvers;