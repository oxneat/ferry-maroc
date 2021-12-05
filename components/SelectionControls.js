import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Feather, AntDesign } from '@expo/vector-icons';

export default function SelectionControls({ onChange, value }) {

    return (
        <>
            {/* <TouchableOpacity onPress={() => {
                // setCount(value - 1)
                onChange(value - 1)
            }}>
                <Feather name="minus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Gilroy-Bold' }} >
                {value}
            </Text>
            <TouchableOpacity onPress={() => {
                // setCount(value + 1)
                onChange(value + 1)
            }}>
                <Feather name="plus" size={20} color="black" />
            </TouchableOpacity> */}

            <View style={[styles.row, { alignItems: 'center' }, styles.cntrls_wrpr]}>
                <TouchableOpacity onPress={() => {
                    onChange(value - 1, 'minus')
                }} style={styles.sng_wr}>
                    <AntDesign name="minus" size={15} color="black" />
                </TouchableOpacity>
                <Text style={[styles.font_bld, { marginHorizontal: 8, fontSize: 15 }]}>
                    {value}
                </Text>
                <TouchableOpacity onPress={() => {
                    onChange(value + 1, 'plus')
                }} style={styles.sng_wr}>
                    <AntDesign name="plus" size={15} color="black" />
                </TouchableOpacity>
            </View>

        </>

    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    font_bld: {
        fontFamily: 'Gilroy-Bold'
    },
    cntrls_wrpr: {
        backgroundColor: '#e9e9ed',
        padding: 5,
        borderRadius: 10
    },
    sng_wr: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5
    },
})
