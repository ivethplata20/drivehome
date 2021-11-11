import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Container, Text, ListItem, View, Button, Icon} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const Perfil = () => {
    // React Navigation
    const navigation = useNavigation();

    return(
        <Container style={ [globalStyles.contenedor, { backgroundColor: '#031D44' } ] }>
            <View style={globalStyles.menuPerfil}>
                <Button
                    block
                    square
                    style={globalStyles.botonPerfil}
                    onPress={ () => navigation.navigate("NuevoInmueble") }
                >
                    <Text style={globalStyles.botonTexto}>   Registrar Inmueble    </Text>
                </Button>

                <Button
                    block
                    square
                    style={globalStyles.botonPerfil}
                    onPress={ () => navigation.navigate("Catalogo") }
                >
                    <Text style={globalStyles.botonTexto}>Catálogo de Inmuebles</Text>
                </Button>
            </View>

            <View style={globalStyles.menuPerfil}>
                <Button
                    block
                    square
                    style={globalStyles.botonPerfil}
                    onPress={ () => navigation.navigate("InmuebleRegistrado") }
                >
                    <Text style={globalStyles.botonTexto}>Inmuebles Registrados </Text>
                </Button>

                <Button
                    block
                    square
                    style={globalStyles.botonPerfil}
                    onPress={ () => navigation.navigate("InmueblesComprados") }
                >
                    <Text style={globalStyles.botonTexto}>Inmuebles Comprados</Text>
                </Button>
            </View>

            <View style={[globalStyles.menuPerfil, {justifyContent: 'center'}]}>
                <Button
                    block
                    square
                    style={globalStyles.botonPerfil}
                    onPress={ () => navigation.navigate("InmueblesSeleccionados") }
                >
                    <Text style={globalStyles.botonTexto}>Inmuebles Seleccionados</Text>
                </Button>
            </View>
        </Container>
    );
};

export default Perfil;