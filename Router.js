// import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';

import { useNavigation, useRoute } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomTabBar from './components/BottomTabBar';

import HomeScreen from './screens/HomeScreen';

import { TabStateContext } from './context/TabManager';

export default function Router() {
    let { showBottomTab } = useContext(TabStateContext);

    let route = useRoute();

    let [loaded, error] = useFonts({
        "Gilroy-Regular": require('./assets/fonts/Gilroy-Regular.ttf'),
        "Gilroy-Bold": require('./assets/fonts/Gilroy-Bold.ttf'),
        "Gilroy-Medium": require('./assets/fonts/Gilroy-Medium.ttf'),
        "Gilroy-Thin": require('./assets/fonts/Gilroy-Thin.ttf'),
        "Gilroy-Heavy": require('./assets/fonts/Gilroy-Heavy.ttf'),
        "Gilroy-SemiBold": require('./assets/fonts/Gilroy-SemiBold.ttf'),
    })

    let navigation = useNavigation();

    if (!loaded || error) {
        return <AppLoading />
    }

    const Stack = createNativeStackNavigator();

    let arr = [["Réserver", "sail-boat", "", 'home'], ["Nos Traversées", "routes", "", 'home'], ["Nos Agences", "shop", 'ent', 'home'], ["Aide", "help", "ent", 'home'], ["Contact", "phone", "fea", 'home']]

    // useEffect(() => {
    // console.log('-------------------------')
    // console.log(route.name)
    // console.log('-------------------------')
    // }, [route.name])

    return (
        // <ReservationScreen />
        // <HeightSelectionScreen />
        // <WebViewScreen />
        <>
            <StatusBar backgroundColor='black' style='light' />
            <Stack.Navigator>
                <Stack.Screen name="home" options={{ headerShown: false }} component={HomeScreen} />
            </Stack.Navigator>
            {showBottomTab && <BottomTabBar arr={arr} />}
        </>
    )
}

