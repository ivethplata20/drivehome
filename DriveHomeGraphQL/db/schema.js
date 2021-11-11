const {gql} = require('apollo-server');

const typeDefs = gql`

    type Token {
        token: String
    }
    
    type Usuario {
        nombre: String
        apellido: String
        CURP: String
        edad: String
        telefono: String
        email: String
        usuario: String
        password: String
        verificacion: Boolean
        id: ID
    }

    type Inmueble {
        tipo: String
        telefono: String
        estado: String
        ciudadMunicipio: String
        calle: String
        NoExterior: String
        NoInterior: String
        codigoPostal: String
        pisos: Int
        banios: Int
        cuartos: Int
        cocina: Boolean
        sala: Boolean
        alberca: Boolean
        escuelas: Boolean
        supermercados: Boolean
        deportivos: Boolean
        centroscomerciales: Boolean
        abarrotes: Boolean
        hoteles: Boolean
        parques: Boolean
        playas: Boolean
        VentaoRenta: String
        descripcion: String
        valorPropiedad: Float
        plusvaliaCalculada: Float
        valorPropiedadNeto: Float
        verificacion: Boolean
        publicacion: Boolean
        comprado: Boolean
        id: ID
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        CURP: String!
        edad: String!
        telefono: String!
        email: String!
        usuario: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ActualizarUsuarioInput {
        telefono: String
        email: String
        usuario: String
        password: String
    }

    input InmuebleInput {
        tipo: String!
        telefono: String!
        estado: String!
        ciudadMunicipio: String!
        calle: String!
        NoExterior: String
        NoInterior: String
        codigoPostal: String!
        pisos: Int!
        banios: Int!
        cuartos: Int!
        cocina: Boolean!
        sala: Boolean!
        alberca: Boolean!
        escuelas: Boolean!
        supermercados: Boolean!
        deportivos: Boolean!
        centroscomerciales: Boolean!
        abarrotes: Boolean!
        hoteles: Boolean!
        parques: Boolean!
        playas: Boolean!
        VentaoRenta: String!
        descripcion: String!
        valorPropiedad: Float!
    }

    input ActualizarInmuebleInput {
        telefono: String
        pisos: Int
        banios: Int
        cuartos: Int
        cocina: Boolean
        sala: Boolean
        alberca: Boolean
        escuelas: Boolean
        supermercados: Boolean
        deportivos: Boolean
        centroscomerciales: Boolean
        abarrotes: Boolean
        hoteles: Boolean
        parques: Boolean
        playas: Boolean
        VentaoRenta: String
        descripcion: String
        valorPropiedad: Float
    }

    type Mutation {

        # Usuarios
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: AutenticarInput): Token
        actualizarUsuario(id: ID!, input: ActualizarUsuarioInput): Usuario
        obetenerUsuarios(id: ID!): [[Usuario]]

        # Seleccion
        seleccionarInmueble(id: ID!): String
        eliminarSeleccion(id: ID!): String

        # Inmuebles
        nuevoInmueble(input: InmuebleInput): Inmueble
        actualizarInmueble(id: ID!, input: ActualizarInmuebleInput): Inmueble
        eliminarInmueble(id: ID!): String
    }

    type Query {
        obtenerInmuebles: [Inmueble]
        obtenerInmueblesTotales: [Inmueble]
        obtenerInmueblesComprados: [Inmueble]
        obtenerSelecciones: [Inmueble]
        obtenerUsuario: Usuario
    }
`;

module.exports = typeDefs;