import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Content, List, ListItem, Left, Right, View} from 'native-base';
import globalStyles from '../styles/global';

const Usuarios = ({route}) => {
    console.log(route);
    console.log('Params');
    console.log(route.params);
    return (
        <Container style={ [globalStyles.contenedor, { backgroundColor: '#031D44' } ] }>
			<Content>
				<List style={styles.contenido}>
                    {route.params.map(usuario => (
						<ListItem
							key={usuario.id}
							style={styles.listado}
						>
							<Left>
								<View>
									<Text style={styles.texto}>Nombre: {usuario[0].nombre}</Text>
									<Text style={styles.texto}>Apellido: {usuario[0].apellido}</Text>
                                    <Text style={styles.texto}>Edad: {usuario[0].edad}</Text>
                                    <Text style={styles.texto}>Telefono: {usuario[0].telefono}</Text>
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

export default Usuarios;