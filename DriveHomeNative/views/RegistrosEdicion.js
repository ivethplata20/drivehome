import React, { useState } from 'react'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { Container, Text, ListItem, Icon, View, Button, Toast} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

// Apollo
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_INMUEBLE = gql`
    mutation eliminarInmueble($id: ID!) {
		eliminarInmueble(id: $id)
    }
`;

const OBTENER_USUARIOS = gql`
    mutation obetenerUsuarios($id: ID!) {
        obetenerUsuarios(id: $id) {
			nombre
			apellido
			CURP
			edad
			telefono
			email
			usuario
			password
			verificacion
			id
        }
    }
`;

// Actualizar el Cache
const OBTENER_INMUEBLES = gql`
    query obtenerInmuebles {
        obtenerInmuebles {
            tipo
			telefono
			estado
			ciudadMunicipio
			calle
			NoExterior
			NoInterior
			codigoPostal
			pisos
			banios
			cuartos
			cocina
			sala
			alberca
			escuelas
			supermercados
			deportivos
			centroscomerciales
			abarrotes
			hoteles
			parques
			playas
			descripcion
			VentaoRenta
			valorPropiedad
			plusvaliaCalculada
			valorPropiedadNeto
			verificacion
			publicacion
			comprado
			id
        }
    }
`;

const Edicion = ({route}) => {
    // State del Formulario
    const [mensaje, guardarMensaje] = useState(null);

    // React Navigation
    const navigation = useNavigation();

	// Apollo
	const [ obetenerUsuarios ] = useMutation(OBTENER_USUARIOS);

    // Mutation de Apollo
    const [ eliminarInmueble ] = useMutation(ELIMINAR_INMUEBLE, {
        update(cache) {
            const { obtenerInmuebles } = cache.readQuery({
                query: OBTENER_INMUEBLES,
                variables: {
                    input: {
                        creador: route.params.creador
                    }
                }
            });

            cache.writeQuery({
                query: OBTENER_INMUEBLES,
                variables: {
                    input: {
                        creador: route.params.creador
                    }
                },
                data: {
                    obtenerInmuebles: obtenerInmuebles.filter( inmuebleActual => inmuebleActual.id !== route.params.id )
                }
            })
        }
    });

    // Dialogo para Eliminar una Tarea
    const mostrarEliminar = () => {
        Alert.alert('Eliminar Inmueble', '¿Deseas Eliminar este Inmueble?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Eliminar',
                onPress: () => eliminarInmuebleDB()
            }
        ])
    }

    // Eliminar Tarea
    const eliminarInmuebleDB = async () => {
        const id = route.params.id;

        try {
            const { data } = await eliminarInmueble({
                variables: {
                    id
                }
            });
            guardarMensaje('Inmueble Eliminado Correctamente');
            navigation.navigate("InmuebleRegistrado");
        } catch (error) {
            console.log(error);
        }
    }

	const obtenerUsuariosInmueble = async () => {
		const id = route.params.id;

		try {
            const { data } = await obetenerUsuarios({
                variables: {
                    id
                }
            });
            navigation.navigate("Usuarios", data.obetenerUsuarios);
        } catch (error) {
            console.log(error);
        }
	}

    // Muestra un mensaje Toast
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'Ok',
            duration: 5000,
        })
    }

    return (
		<Container style={ [globalStyles.contenedor, { backgroundColor: '#031D44' } ] }>
			<ScrollView>
				<View style={[styles.contenido, {backgroundColor: '#04395E'}]}>
					<Text style={styles.texto}>Tipo: {route.params.tipo}</Text>
					<Text style={styles.texto}>Telefono de Contacto: {route.params.telefono}</Text>
					<Text style={styles.texto}>Estado: {route.params.estado}</Text>
					<Text style={styles.texto}>Ciudad o Municipio: {route.params.ciudadMunicipio}</Text>
					<Text style={styles.texto}>Calle: {route.params.calle}</Text>
					<Text style={styles.texto}>No. Exterior: {route.params.NoExterior}</Text>
					<Text style={styles.texto}>No. Interior: {route.params.NoInterior}</Text>
					<Text style={styles.texto}>Código Postal: {route.params.codigoPostal}</Text>
					<Text style={styles.texto}>Pisos: {route.params.pisos}</Text>
					<Text style={styles.texto}>Baños: {route.params.banios}</Text>
					<Text style={[{textTransform: 'uppercase'}, {fontWeight: 'bold'}, {color: '#FFF'}, {fontSize: 18}]}>Cuartos: {route.params.cuartos}</Text>
					
					<View style={styles.plusvalias}>
						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Cocina</Text>
							{ route.params.cocina ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }

							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Alberca</Text>
							{ route.params.alberca ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>

						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Escuelas</Text>
							{ route.params.escuelas ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }

							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Deportivos</Text>
							{ route.params.deportivos ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>

						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Abarrotes</Text>
							{ route.params.abarrotes ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }

							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Hoteles</Text>
							{ route.params.hoteles ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>

						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Parques</Text>
							{ route.params.parques ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }

							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Playas</Text>
							{ route.params.playas ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>

						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Sala</Text>
							{ route.params.sala ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>

						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Supermercados</Text>
							{ route.params.supermercados ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>

						<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Centros Comerciales</Text>
							{ route.params.centroscomerciales ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
						</ListItem>
					</View>

					<Text style={styles.texto}>Venta/Renta: {route.params.VentaoRenta}</Text>
					<Text style={styles.texto}>Descripcion: {route.params.descripcion}</Text>
					<Text style={styles.texto}>Valor de Propiedad: ${route.params.valorPropiedad}</Text>

					<ListItem style={styles.cuadro}>
							<Text style={[styles.texto, {marginRight: 15}, {paddingTop: 7}]}>Comprado</Text>
							{ route.params.comprado ? (
								<Icon
									style={[styles.icono, styles.completo]}
									name="ios-checkmark-circle"
								/>
							) : (
								<Icon
								style={[styles.icono, styles.incompleto]}
									name="ios-checkmark-circle"
								/>
							) }
					</ListItem>

					<Button
                        block
                        square
                        style={[globalStyles.boton, {marginBottom: 10}]}
                        onPress={ () => obtenerUsuariosInmueble() }
                    >
                        <Text style={globalStyles.botonTexto}>Ver Usuarios Interesados</Text>
                    </Button>

                    <Button
                        block
                        square
                        style={globalStyles.boton}
                        onPress={ () => mostrarEliminar() }
                    >
                        <Text style={globalStyles.botonTexto}>Eliminar</Text>
                    </Button>

                    {mensaje && mostrarAlerta()}
				</View>
			</ScrollView>
		</Container>
	);
};

const styles = StyleSheet.create({
	texto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
		fontSize: 18,
		marginBottom: 10,
	},
	contenido: {
		flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '5%',
        flex: 1,
		marginVertical: '5%',
		padding: 20
	},
	icono: {
        fontSize: 32,
    },
    completo: {
        color: '#45CB85',
    },
    incompleto: {
        color: '#FF595E',
    },
	cuadro: {
		marginVertical: -10,
        borderBottomColor: '#2E2E2E',
		justifyContent: 'space-around',
	},
	plusvalias: {
		backgroundColor: '#2E2E2E',
		marginVertical: 20,
	}
})

export default Edicion;