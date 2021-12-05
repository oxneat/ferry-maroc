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

import { routes } from './helpers/OtherData';

import OtherScreens from './screens/OtherScreens';

import AlertMessage from './components/AlertMessage';

import { AlertContext } from './context/AlertManager';

export default function Router() {
    let { showBottomTab } = useContext(TabStateContext);

    const { alert } = useContext(AlertContext);

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

    let arr = [["Réserver", "sail-boat", "", 'home'], ["Nos Traversées", "routes", "", 'trav'], ["Nos Agences", "shop", 'ent', 'agen'], ["Aide", "help", "ent", 'hel'], ["Contact", "phone", "fea", 'cont']]

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
            <StatusBar  style='dark' />
            <Stack.Navigator>
                <Stack.Screen name="home" options={{ headerShown: false }} component={HomeScreen} />
                {/* <Stack.Screen name={arr[0][3]} options={{ headerShown: false }} children={() => <OtherScreens endPoint={routes[0]} />} /> */}
                <Stack.Screen name={arr[1][3]} options={{ headerShown: false }} children={() => <OtherScreens endPoint={routes[0]} />} />
                <Stack.Screen name={arr[2][3]} options={{ headerShown: false }} children={() => <OtherScreens endPoint={routes[1]} />} />
                <Stack.Screen name={arr[3][3]} options={{ headerShown: false }} children={() => <OtherScreens endPoint={routes[2]} />} />
                <Stack.Screen name={arr[4][3]} options={{ headerShown: false }} children={() => <OtherScreens endPoint={routes[3]} />} />
            </Stack.Navigator>
            {showBottomTab && <BottomTabBar arr={arr} />}
            {alert.type != '' && alert.msg != '' && <AlertMessage title={alert.msg} type={alert.type} />}
        </>
    )
}

