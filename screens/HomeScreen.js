import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationScreen from './ReservationScreen';
import CalendarScreen from './CalendarScreen';
import WebViewScreen from './WebViewScreen';
import NormalWebViewScreen from './NormalWebViewScreen';
// import WebViewTestScreen from './WebViewTestScreen';

let Stack = createNativeStackNavigator();



export default function HomeScreen() {

    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="wbtst" options={{ headerShown: false }} component={WebViewTestScreen} /> */}
            <Stack.Screen name="book" options={{ headerShown: false }} component={ReservationScreen} />
            <Stack.Screen name="calendar" options={{ headerShown: false }} component={CalendarScreen} />
            <Stack.Screen name="search" options={{ headerShown: false }} component={NormalWebViewScreen} />
        </Stack.Navigator>
    )
}
