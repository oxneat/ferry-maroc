import React from 'react';

import { TabStateProvider } from './context/TabManager';

import { AlertProvider } from './context/AlertManager';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import RouterScreen from './Router';

import MessageScreen from './screens/MessageScreen';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

export default function App() {

  let [loaded, error] = useFonts({
    "Gilroy-Regular": require('./assets/fonts/Gilroy-Regular.ttf'),
    "Gilroy-Bold": require('./assets/fonts/Gilroy-Bold.ttf'),
    "Gilroy-Medium": require('./assets/fonts/Gilroy-Medium.ttf'),
    "Gilroy-Thin": require('./assets/fonts/Gilroy-Thin.ttf'),
    "Gilroy-Heavy": require('./assets/fonts/Gilroy-Heavy.ttf'),
    "Gilroy-SemiBold": require('./assets/fonts/Gilroy-SemiBold.ttf'),
  })

  if (!loaded || error) {
    return <AppLoading />
  }

  return (
    <AlertProvider>
      <TabStateProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="msg" options={{ headerShown: false }} component={MessageScreen} />
            <Stack.Screen name="hm" options={{ headerShown: false }} component={RouterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TabStateProvider>
    </AlertProvider>
  )
}