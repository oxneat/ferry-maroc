import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Constants from 'expo-constants';

import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import Colors from '../helpers/Colors';
import { AlertContext } from '../context/AlertManager';

export default function AlertMessage({ title, type = 'err' }) {
    const { setAlert } = useContext(AlertContext);

    return (
        <TouchableOpacity onPress={() => {
            setAlert({ type: '', msg: '' })
        }} style={{ ...styles.container, backgroundColor: type == 'warn' ? Colors.main : type == 'success' ? '#48c244' : 'red' }}>
            {type == 'warn' ? <Ionicons name="warning-outline" size={24} color="white" /> :
                type == 'err' ? <MaterialIcons name="error-outline" size={24} color="white" /> : <AntDesign name="checkcircleo" size={24} color="white" />}
            <Text style={styles.txt}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: 60,
        top: Constants.statusBarHeight,
        // alignItems: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    txt: {
        color: 'white',
        fontFamily: 'Gilroy-Bold',
        marginLeft: 10
    }
})
