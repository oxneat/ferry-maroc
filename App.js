import React from 'react';

import { TabStateProvider } from './context/TabManager';

import { AlertProvider } from './context/AlertManager';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import RouterScreen from './Router';

export default function App() {
  return (
    <AlertProvider>
      <TabStateProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="hm" options={{ headerShown: false }} component={RouterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TabStateProvider>
    </AlertProvider>
  )
}