// import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

import ReservationScreen from './screens/ReservationScreen';
// import HeightSelectionScreen from './screens/HeightSelectionScreen';
import WebViewScreen from './screens/WebViewScreen';

import CalendarScreen from './screens/CalendarScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';

import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

let Icon = ({ type, name }) => {
    if (type == 'fea') {
        return <Feather name={name} size={24} color="black" />
    } else if (type == 'ent') {
        return <Entypo name={name} size={24} color="black" />
    } else {
        return <MaterialCommunityIcons name={name} size={24} color="black" />
    }
}

export default function Router() {

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

    return (
        // <ReservationScreen />
        // <HeightSelectionScreen />
        // <WebViewScreen />
        <>
            <StatusBar backgroundColor='black' style='light' />
            <Stack.Navigator>
                <Stack.Screen name="home" options={{ headerShown: false }} component={ReservationScreen} />
                <Stack.Screen name="calendar" options={{ headerShown: false }} component={CalendarScreen} />
                <Stack.Screen name="search" options={{ headerShown: false }} component={WebViewScreen} />
            </Stack.Navigator>

            <View style={styles.container} >
                {
                    arr.map((item, index) => {
                        let type = item[2];

                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(item[3]);
                            }} style={styles.icn} key={index + ' icn main'}>
                                <Icon name={item[1]} type={type} />
                                <Text style={styles.txt}>
                                    {
                                        item[0]
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        borderTopColor: 'gray',
        borderTopWidth: 0.5
    },
    icn: {
        alignItems: 'center'
    },
    txt: {
        fontFamily: 'Gilroy-Medium',
        fontSize: 10
    }
});
