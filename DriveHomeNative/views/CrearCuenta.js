import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

// Apollo
import { gql, useMutation } from '@apollo/client';

const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
        crearUsuario(input: $input)
    }
`;

const CrearCuenta = () => {
    // State del Formulario
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    const [CURP, guardarCurp] = useState('');
    const [edad, guardarEdad] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [email, guardarEmail] = useState('');
    const [usuario, guardarUsuario] = useState('');
    const [password, guardarPassword] = useState('');

    const [mensaje, guardarMensaje] = useState(null);

    // React Navigation
    const navigation = useNavigation();

    // Mutation de Apollo
    const [ crearUsuario ] = useMutation(NUEVA_CUENTA);

    // Presiona en Crear Cuenta

    const handleSubmit = async () => {
        // Validar
        if(nombre === '' || apellido === '' || CURP==='' || edad==='' || telefono==='' ||
        email==='' || usuario==='' || password==='') {
            // Mostrar un error
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }

        // Password de al menos 6 Caracteres
        if(password.length < 6) {
            // Mostrar un error
            guardarMensaje('El password debe ser de al menos 6 caracteres');
            return;
        }

        // Guardar el Usuario
        try {
            const { data } = await crearUsuario({
                variables: {
                    input: {
                        nombre,
                        apellido,
                        CURP,
                        edad,
                        telefono,
                        email,
                        usuario,
                        password
                    }
                }
            });

            guardarMensaje(data.crearUsuario);
            navigation.navigate("Login");
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
      <ScrollView>
        <Container style={ [globalStyles.contenedor, { backgroundColor: '#031D44' } ] }>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Drive Home</H1>

                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Nombre"
                            onChangeText={ texto => guardarNombre(texto) }
                        />
                    </Item>

                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Apellido"
                            onChangeText={ texto => guardarApellido(texto) }
                        />
                    </Item>

                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="CURP"
                            onChangeText={ texto => guardarCurp(texto) }
                        />
                    </Item>

                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Edad"
                            keyboardType="numeric"
                            onChangeText={ texto => guardarEdad(texto) }
                        />
                    </Item>

                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Telefono"
                            keyboardType="numeric"
                            onChangeText={ texto => guardarTelefono(texto) }
                        />
                    </Item>

                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={ texto => guardarEmail(texto) }
                        />
                    </Item>

                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Usuario"
                            onChangeText={ texto => guardarUsuario(texto) }
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
                    <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
                </Button>

                {mensaje && mostrarAlerta()}
            </View>
        </Container>
      </ScrollView>
  );
};

export default CrearCuenta;