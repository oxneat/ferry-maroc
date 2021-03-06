import React from 'react';

import { StyleSheet, Text, View, Platform } from 'react-native';

import SelectionControls from './SelectionControls';

import Colors from '../helpers/Colors';

export default function FoodRow({ title, value, onChange }) {
    return (
        <View style={[styles.rw, styles.wrapper]}>
            <Text style={{ fontFamily: 'Gilroy-Bold', flex: 1, color: Colors.main }}>
                {
                    Platform.OS == 'ios' ? title.replace(/<[^>]*>?/gm, '').replaceAll('\n', '').replaceAll('   ', '') : title
                }
            </Text>
            <SelectionControls value={value} onChange={onChange} />
        </View>
    )
}

const styles = StyleSheet.create({
    rw: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapper: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})
