import React, { useEffect } from 'react';

import { NavigationContext } from '@react-navigation/native';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

let Icon = ({ type, name }) => {
    if (type == 'fea') {
        return <Feather name={name} size={24} color="black" />
    } else if (type == 'ent') {
        return <Entypo name={name} size={24} color="black" />
    } else {
        return <MaterialCommunityIcons name={name} size={24} color="black" />
    }
}

export default function BottomTabBar({ arr }) {
    // let route = useRoute();

    // useEffect(() => {
    //     console.log('-----------Route Name--------------------')
    //     console.log(NavigationContext.displayName)
    //     console.log('-----------Route Name--------------------')
    // }, [NavigationContext])

    return (
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
    }
})
