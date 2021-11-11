import React, { useState } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { Container, Button, Text, H1, Form, Item, Input, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';

// Apollo
import { gql, useMutation } from '@apollo/client';

const NUEVO_INMUEBLE = gql`
    mutation nuevoInmueble($input: InmuebleInput) {
        nuevoInmueble(input: $input) {
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

const NuevoInmueble = () => {
    // State del Formulario
    const [tipo, guardarTipo] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [estado, guardarEstado] = useState('');
    const [ciudadMunicipio, guardarCiudadMunicipio] = useState('');
    const [calle, guardarCalle] = useState('');
    const [NoExterior, guardarNoExterior] = useState('');
    const [NoInterior, guardarNoInterior] = useState('');
    const [codigoPostal, guardarCodigoPostal] = useState('');
    const [pisos2, guardarPisos] = useState('');
    const [banios2, guardarBanios] = useState('');
    const [cuartos2, guardarCuartos] = useState('');
    const [descripcion, guardarDescripcion] = useState('');
    const [valorPropiedad2, guardarValorPropiedad] = useState('');
    const [VentaoRenta, guardarVentaoRenta] = useState('');

    const [isEnabledCocina, setIsEnabledCocina] = useState(false);
    const [isEnabledSala, setIsEnabledSala] = useState(false);
    const [isEnabledAlberca, setIsEnabledAlberca] = useState(false);
    const [isEnabledEscuelas, setIsEnabledEscuelas] = useState(false);
    const [isEnabledSupermercados, setIsEnabledSupermercados] = useState(false);
    const [isEnabledDeportivos, setIsEnabledDeportivos] = useState(false);
    const [isEnabledCentrosComerciales, setIsEnabledCentrosComerciales] = useState(false);
    const [isEnabledAbarrotes, setIsEnabledAbarrotes] = useState(false);
    const [isEnabledHoteles, setIsEnabledHoteles] = useState(false);
    const [isEnabledParques, setIsEnabledParques] = useState(false);
    const [isEnabledPlayas, setIsEnabledPlayas] = useState(false);

    const toggleSwitchCocina = () => setIsEnabledCocina(previousState => !previousState);
    const toggleSwitchSala = () => setIsEnabledSala(previousState => !previousState);
    const toggleSwitchAlberca = () => setIsEnabledAlberca(previousState => !previousState)
    const toggleSwitchEscuelas = () => setIsEnabledEscuelas(previousState => !previousState);
    const toggleSwitchSupermercados = () => setIsEnabledSupermercados(previousState => !previousState);
    const toggleSwitchDeportivos = () => setIsEnabledDeportivos(previousState => !previousState);
    const toggleSwitchCentrosComerciales = () => setIsEnabledCentrosComerciales(previousState => !previousState);
    const toggleSwitchAbarrotes = () => setIsEnabledAbarrotes(previousState => !previousState);
    const toggleSwitchHoteles = () => setIsEnabledHoteles(previousState => !previousState);
    const toggleSwitchParques = () => setIsEnabledParques(previousState => !previousState);
    const toggleSwitchPlayas = () => setIsEnabledPlayas(previousState => !previousState);

    const [mensaje, guardarMensaje] = useState(null);

    // React Navigation
    const navigation = useNavigation();

    // Mutation de Apollo
    const [ nuevoInmueble ] = useMutation(NUEVO_INMUEBLE);
    /*const [ nuevoInmueble ] = useMutation(NUEVO_INMUEBLE, {
        update(cache, { data: { nuevoInmueble } }) {
            const { obtenerInmuebles } = cache.readQuery({ query: OBTENER_INMUEBLES });
            cache.writeQuery({
                query: OBTENER_INMUEBLES,
                data: { obtenerInmuebles: obtenerInmuebles.concat([nuevoInmueble]) }
            })
        }
    });*/

    // Crear Inmueble
    const handleSubmit = async () => {
        // Validar
        if(tipo === '' || telefono ==='' || estado === '' || ciudadMunicipio === '' || calle === '' ||
            codigoPostal === '' || pisos2 === '' || banios2 === '' || VentaoRenta === '' ||
            cuartos2 === '' || descripcion === '' || valorPropiedad2 === '') {
            // Mostrar un error
            guardarMensaje('Completa los Campos Obligatorios *');
            return;
        }

        // Transformar Los Numeros y Decimales
        const valorPropiedad = parseFloat(valorPropiedad2);
        const pisos = parseInt(pisos2);
        const banios = parseInt(banios2);
        const cuartos = parseInt(cuartos2);

        // Establecer valores de las plusvalias
        const cocina = isEnabledCocina;
        const sala = isEnabledSala;
        const alberca = isEnabledAlberca;
        const escuelas = isEnabledEscuelas;
        const supermercados = isEnabledSupermercados;
        const deportivos = isEnabledDeportivos;
        const centroscomerciales = isEnabledCentrosComerciales;
        const abarrotes = isEnabledAbarrotes;
        const hoteles = isEnabledHoteles;
        const parques = isEnabledParques;
        const playas = isEnabledPlayas;

        // Guardar el Inmueble en la Base de Datos
        try {
            const { data } = await nuevoInmueble({
                variables: {
                    input: {
                        tipo,
                        telefono,
                        estado,
                        ciudadMunicipio,
                        calle,
                        codigoPostal,
                        NoExterior,
                        NoInterior,
                        pisos,
                        banios,
                        cuartos,
                        cocina,
                        sala,
                        alberca,
                        escuelas,
                        supermercados,
                        deportivos,
                        centroscomerciales,
                        abarrotes,
                        hoteles,
                        parques,
                        playas,
                        VentaoRenta,
                        descripcion,
                        valorPropiedad
                    }
                }
            });

            guardarMensaje('Proyecto Creado Correctamente');
            navigation.navigate("Perfil");
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error:',''));
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
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.subtitulo}>Drive Home</H1>
                <ScrollView>
                    <Form>
                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="Tipo*"
                                onChangeText={ texto => guardarTipo(texto) }
                            />

                            <Input
                                placeholder="Telefono de Contacto*"
                                keyboardType="numeric"
                                onChangeText={ texto => guardarTelefono(texto) }
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="Dirección: Estado*"
                                onChangeText={ texto => guardarEstado(texto) }
                            />

                            <Input
                                placeholder="Ciudad o Municipio*"
                                onChangeText={ texto => guardarCiudadMunicipio(texto) }
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="Calle*"
                                onChangeText={ texto => guardarCalle(texto) }
                            />

                            <Input
                                placeholder="Codigo Postal*"
                                keyboardType="numeric"
                                onChangeText={ texto => guardarCodigoPostal(texto) }
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="No. Exterior"
                                onChangeText={ texto => guardarNoExterior(texto) }
                            />

                            <Input
                                placeholder="No. Interior"
                                onChangeText={ texto => guardarNoInterior(texto) }
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="Pisos*"
                                keyboardType="numeric"
                                onChangeText={ texto => guardarPisos(texto) }
                            />

                            <Input
                                placeholder="Baños*"
                                keyboardType="numeric"
                                onChangeText={ texto => guardarBanios(texto) }
                            />

                            <Input
                                placeholder="Cuartos*"
                                keyboardType="numeric"
                                onChangeText={ texto => guardarCuartos(texto) }
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.cuadroPlusvalias}>
                            <Text style={globalStyles.texto}>Cocina</Text>
                            <Switch
                                style={globalStyles.switch}
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledCocina ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchCocina}
                                value={isEnabledCocina}
                            />

                            <Text style={globalStyles.texto}>Sala</Text>
                            <Switch
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledSala ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchSala}
                                value={isEnabledSala}
                            />

                            <Text style={globalStyles.texto}>Alberca</Text>
                            <Switch
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledAlberca ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchAlberca}
                                value={isEnabledAlberca}
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.cuadroPlusvalias}>
                            <Text style={globalStyles.texto}>Escuelas</Text>
                            <Switch
                                style={globalStyles.switch}
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledEscuelas ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchEscuelas}
                                value={isEnabledEscuelas}
                            />

                            <Text style={globalStyles.texto}>Supermercados</Text>
                            <Switch
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledSupermercados ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchSupermercados}
                                value={isEnabledSupermercados}
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.cuadroPlusvalias}>
                            <Text style={globalStyles.texto}>Deportivos</Text>
                            <Switch
                                style={globalStyles.switch}
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledDeportivos ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchDeportivos}
                                value={isEnabledDeportivos}
                            />

                            <Text style={globalStyles.texto}>Centros Comerciales</Text>
                            <Switch
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledCentrosComerciales ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchCentrosComerciales}
                                value={isEnabledCentrosComerciales}
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.cuadroPlusvalias}>
                            <Text style={globalStyles.texto}>Abarrotes</Text>
                            <Switch
                                style={globalStyles.switch}
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledAbarrotes ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchAbarrotes}
                                value={isEnabledAbarrotes}
                            />

                            <Text style={globalStyles.texto}>Hoteles</Text>
                            <Switch
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledHoteles ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchHoteles}
                                value={isEnabledHoteles}
                            />

                            <Text style={globalStyles.texto}>Parques</Text>
                            <Switch
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledParques ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchParques}
                                value={isEnabledParques}
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.cuadroPlusvalias}>
                            <Text style={globalStyles.texto}>Playas</Text>
                            <Switch
                                style={globalStyles.switch}
                                trackColor={{ false: '#FF0000', true: '#00BB2D' }}
                                thumbColor={isEnabledPlayas ? "#000000" : "#000000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchPlayas}
                                value={isEnabledPlayas}
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="Descripción*"
                                multiline={true}
                                onChangeText={ texto => guardarDescripcion(texto) }
                            />
                        </Item>

                        <Item inlineLabel last style={globalStyles.input}>
                            <Input
                                placeholder="Valor*"
                                keyboardType="numeric"
                                onChangeText={ texto => guardarValorPropiedad(texto) }
                            />

                            <Input
                                placeholder="Venta/Renta*"
                                onChangeText={ texto => guardarVentaoRenta(texto) }
                            />
                        </Item>
                    </Form>

                    <Button
                        square
                        block
                        style={globalStyles.botonNuevoInmueble}
                        onPress={ () => handleSubmit() }
                    >
                        <Text style={globalStyles.botonTexto}>Crear Inmueble</Text>
                    </Button>
                </ScrollView>

                {mensaje && mostrarAlerta()}
            </View>
        </Container>
    );
};

export default NuevoInmueble;