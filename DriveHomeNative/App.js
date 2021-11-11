import 'react-native-gesture-handler';
import React from 'react';
import { Root } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Perfil from './views/Perfil';
import NuevoInmueble from './views/NuevoInmueble';
import Catalogo from './views/Catalogo';
import Inmueble from './views/Inmueble';
import InmuebleRegistrado from './views/InmuebleRegistrado';
import InmueblesComprados from './views/InmueblesComprados';
import RegistrosEdicion from './views/RegistrosEdicion';
import Seleccionar from './views/Seleccionar';
import InmueblesSeleccionados from './views/InmueblesSeleccionados';
import Usuarios from './views/Usuarios';
import inSelecEliminar from './views/InSelecEliminar';

const App = () => {
  return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Iniciar Sesión",
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CrearCuenta"
              component={CrearCuenta}
              options={{
                title: "Crear Cuenta",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="Perfil"
              component={Perfil}
              options={{
                title: "Menú Principal",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="NuevoInmueble"
              component={NuevoInmueble}
              options={{
                title: "Registrar Inmueble",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="Catalogo"
              component={Catalogo}
              options={{
                title: "Cátalogo de Inmuebles",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="Inmueble"
              component={Inmueble}
              options={ ({route}) => ({
                title: route.params.tipo,
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              })}
            />

            <Stack.Screen
              name="InmuebleRegistrado"
              component={InmuebleRegistrado}
              options={{
                title: "Inmuebles Registrados",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="InmueblesComprados"
              component={InmueblesComprados}
              options={{
                title: "Inmuebles Comprados",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="RegistrosEdicion"
              component={RegistrosEdicion}
              options={ ({route}) => ({
                title: route.params.tipo,
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              })}
            />

            <Stack.Screen
              name="Seleccionar"
              component={Seleccionar}
              options={ ({route}) => ({
                title: route.params.tipo,
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              })}
            />

            <Stack.Screen
              name="InmueblesSeleccionados"
              component={InmueblesSeleccionados}
              options={{
                title: "Inmuebles Seleccionados",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="Usuarios"
              component={Usuarios}
              options={{
                title: "Usuarios",
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="inSelecEliminar"
              component={inSelecEliminar}
              options={ ({route}) => ({
                title: route.params.tipo,
                headerStyle: {
                  backgroundColor: '#FF595E'
                },
                headerTintColor: "#FFF",
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
  );
};

export default App;