import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';

// Apollo
import { gql, useMutation } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($input: AutenticarInput) {
		autenticarUsuario(input: $input) {
		token
		}
	}
`;

const Login = () => {
    // State del Formulario
    const [email, guardarEmail] = useState('');
    const [password, guardarPassword] = useState('');

    const [mensaje, guardarMensaje] = useState(null);

    // React Navigation
    const navigation = useNavigation();

	// Mutation de Apollo
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

    // Cuando el Usuario Presiona en Iniciar Sesion
    const handleSubmit = async () => {
        // Validar
        if(email === '' || password==='') {
            // Mostrar un error
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }

		// Iniciar Sesion
		try {
			// Autenticar el Usuario
			const { data } = await autenticarUsuario({
				variables: {
					input: {
						email,
						password
					}
				}
			});
			const { token } = data.autenticarUsuario;
			
			// Colocar Token en Storage
			await AsyncStorage.setItem('token', token);

			// Navegar a Perfil
			navigation.navigate("Perfil");
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
        <View style={globalStyles.contenido}>
            <H1 style={globalStyles.titulo}>Drive Home</H1>

            <Form>
                <Item inlineLabel last style={globalStyles.input}>
                    <Input
                        placeholder="Email"
                        autoCompleteType="email"
                    	onChangeText={ texto => guardarEmail(texto.toLowerCase() ) }
                        value={email}
                    />
                </Item>

                <Item inlineLabel last style={globalStyles.input}>
                    <Input
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={ texto => guardarPassword(texto) }
                    />
                </Item>
            </Form>

            <Button
                square
                block
                style={globalStyles.boton}
            	onPress={ () => handleSubmit() }
            >
                <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
            </Button>

            <Text
                style={globalStyles.enlace}
            	onPress={ () => navigation.navigate("CrearCuenta") }
            >Crear Cuenta</Text>

			{mensaje && mostrarAlerta()}
        </View>
    </Container>
  );
};

export default Login;