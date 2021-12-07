import React, { useContext } from 'react';

import { NavigationContext } from '@react-navigation/native';

import { StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';

import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { TabStateContext } from '../context/TabManager';

import Colors from '../helpers/Colors'

let Icon = ({ type, name, color }) => {
    if (type == 'fea') {
        return <Feather name={name} size={24} color={color} />
    } else if (type == 'ent') {
        return <Entypo name={name} size={24} color={color} />
    } else {
        return <MaterialCommunityIcons name={name} size={24} color={color} />
    }
}

export default function BottomTabBar({ arr }) {
    // let route = useRoute();

    // useEffect(() => {
    //     console.log('-----------Route Name--------------------')
    //     console.log(NavigationContext.displayName)
    //     console.log('-----------Route Name--------------------')
    // }, [NavigationContext])
    let navigation = useNavigation();

    const { currentRoute, setCurrentRoute } = useContext(TabStateContext);

    return (
        <View style={styles.container} >
            {
                arr.map((item, index) => {
                    let type = item[2];

                    return (
                        <TouchableOpacity onPress={() => {
                            // console.log(item[3]);
                            setCurrentRoute(item[3]);
                            navigation.navigate(item[3]);
                        }} style={styles.icn} key={index + ' icn main'}>
                            <Icon color={item[3] == currentRoute ? Colors.main : 'black'} name={item[1]} type={type} />
                            <Text style={[styles.txt, item[3] == currentRoute ? styles.selectedTxt : { color: 'black' }]}>
                                {
                                    item[0]
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
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
        borderTopWidth: 0.5,
        zIndex: 1000
    },
    icn: {
        alignItems: 'center'
    },
    txt: {
        fontFamily: 'Gilroy-Medium',
        fontSize: 10
    },
    selectedTxt: {
        fontFamily: 'Gilroy-Bold',
        color: Colors.main
    }
})
