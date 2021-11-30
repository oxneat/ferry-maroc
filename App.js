// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

import ReservationScreen from './screens/ReservationScreen';
// import HeightSelectionScreen from './screens/HeightSelectionScreen';
import WebViewScreen from './screens/WebViewScreen';
import CalendarScreen from './screens/CalendarScreen';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';

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

  const Stack = createNativeStackNavigator();

  return (
    // <ReservationScreen />
    // <HeightSelectionScreen />
    // <WebViewScreen />
    <NavigationContainer>
      <StatusBar backgroundColor='black' style='light' />
      <Stack.Navigator>
        <Stack.Screen name="home" options={{ headerShown: false }} component={ReservationScreen} />
        <Stack.Screen name="calendar" options={{ headerShown: false }} component={CalendarScreen} />
        <Stack.Screen name="search" options={{ headerShown: false }} component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
