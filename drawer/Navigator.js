import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home';
import ImageDetails from '../ImageDetails';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Sidebar() {
  return (

    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  )
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sidebar" options={{ headerShown: false }} component={Sidebar} />
        <Stack.Screen name="Product" options={{ headerShown: false }} component={ImageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}