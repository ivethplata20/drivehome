import React, { useState } from 'react'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { Container, Text, ListItem, Icon, View, Button, Toast} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

// Apollo
import { gql, useMutation } from '@apollo/client';

const SELECCIONAR_INMUEBLE = gql`
    mutation seleccionarInmueble($id: ID!) {
        seleccionarInmueble(id: $id)
    }
`;

const Seleccionar = ({route}) => {
    // State del Formulario
    const [mensaje, guardarMensaje] = useState(null);

    // React Navigation
    const navigation = useNavigation();

    // Mutation de Apollo
    const [ seleccionarInmueble ] = useMutation(SELECCIONAR_INMUEBLE);

    // Selecionar
    const SeleccionarInmueble = async () => {
        const id = route.params.id;

        try {
            const { data } = await seleccionarInmueble({
                variables: {
                    id
                }
            });
            guardarMensaje('Inmueble Seleccionado Correctamente');
            navigation.navigate("Catalogo");
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error:',''));
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
                        style={globalStyles.boton}
                        onPress={ () => SeleccionarInmueble() }
                    >
                        <Text style={globalStyles.botonTexto}>Seleccionar</Text>
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

export default Seleccionar;