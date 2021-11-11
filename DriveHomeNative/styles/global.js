import React from 'react';
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
    },
    subtitulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 20,
    },
    cuadroPlusvalias: {
        backgroundColor: '#031D44',
        marginBottom: 20,
        borderBottomColor: '#031D44',
        justifyContent: 'center',
    },
    menuPerfil: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    switch: {
        marginRight: 10,
    },
    texto: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 20,
    },
    boton: {
        backgroundColor: '#FF595E',
    },
    botonPerfil: {
        backgroundColor: '#FF595E',
        marginTop: 20,
    },
    botonNuevoInmueble: {
        backgroundColor: '#FF595E',
        marginBottom: 20,
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
    },
    enlace: {
        color: '#FFF',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
    }
});

export default globalStyles;