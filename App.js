import React from 'react'
import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import RouterScreen from './Router';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="hm" options={{ headerShown: false }} component={RouterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}