import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../helpers/Colors';

import { useNavigation } from '@react-navigation/native';

export default function TopBar({ onBack, children, title = 'Calendrier' }) {
    let navigation = useNavigation();

    return (
        <View style={styles.wrpr}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="md-arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.txt}>{title}</Text>
            <View>
                {
                    children
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrpr: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        position:'relative',
        zIndex:2000
    },
    txt: {
        fontFamily: 'Gilroy-Bold',
        fontSize: 20,
        color: Colors.main
    }
})
