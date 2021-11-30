import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import SelectionControls from './SelectionControls';

import { FontAwesome5, FontAwesome, AntDesign, Feather, Entypo } from '@expo/vector-icons';

export default function PassengersRow({ name, title, icon, subTit,onChange,value }) {

    return (
        <View style={{ ...styles.rw, justifyContent: 'space-between', marginVertical: 10 }} >
            <View style={styles.rw} >
                {
                    icon == 'fea' ?
                        <Feather name={name} size={24} color="gray" /> :
                        icon == 'ant' ?
                            <AntDesign name={name} size={24} color="gray" /> :
                            icon == 'fa' ?
                                <FontAwesome name={name} size={24} color="gray" /> :
                                icon == 'ent' ?
                                    <Entypo name={name} size={24} color="gray" /> :
                                    <FontAwesome5 name={name} size={24} color="gray" />

                }

                <View style={{ marginLeft: 10 }} >
                    <Text style={{ fontFamily: 'Gilroy-SemiBold', color: 'gray' }} >
                        {title}
                    </Text>
                    {subTit && <Text style={{ fontFamily: 'Gilroy-Bold', color: 'gray', fontSize: 10 }} >
                        {
                            subTit
                        }
                    </Text>}
                </View>
            </View>
            <View style={styles.rw} >
                <SelectionControls value={value} onChange={onChange} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rw: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})
