import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Content, List, ListItem, Left, Right, View} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

// Apollo
import { gql, useQuery } from '@apollo/client';

const OBTENER_INMUEBLES = gql`
    query obtenerInmueblesTotales {
        obtenerInmueblesTotales {
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

const Catalogo = () => {
	// React Navigation
	const navigation = useNavigation();

	// Apollo
	const {data, loading, error } = useQuery(OBTENER_INMUEBLES);

	console.log(data);
	console.log(loading);
	console.log(error);

	if(loading) return <Text>Cargando...</Text>

	return (
		<Container style={ [globalStyles.contenedor, { backgroundColor: '#031D44' } ] }>
			<Content>
				<List style={styles.contenido}>
					{data.obtenerInmueblesTotales.map(inmueble => (
						<ListItem
							key={inmueble.id}
							style={styles.listado}
							onPress={ () => navigation.navigate("Seleccionar", inmueble) }
						>
							<Left>
								<View>
									<Text style={styles.texto}>{inmueble.tipo}</Text>
									<Text style={styles.texto}>${inmueble.valorPropiedad}</Text>
									<Text style={styles.texto}>{inmueble.ciudadMunicipio}</Text>
									<Text style={[styles.texto, {fontWeight: 'bold'}]}>{inmueble.VentaoRenta}</Text>
								</View>
							</Left>
							<Right>
									
							</Right>
						</ListItem>
					))}
				</List>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#96ADC8',
        marginHorizontal: '2.5%',
		marginVertical: '2.5%',
    },
	listado: {
		flexDirection: 'row',
        justifyContent: 'space-between',
		borderBottomColor: '#FF595E',
		borderBottomWidth: 4,
	},
	texto: {
        fontSize: 18,
	}
})

export default Catalogo;