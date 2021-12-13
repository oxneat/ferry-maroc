import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import SelectionControls from '../components/SelectionControls';

import Colors from '../helpers/Colors';

export default function CardItem({ title, price, onChange, value, swr, wc, capacity }) {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.row, { alignItems: 'center' }]}>
                <View style={styles.flx}>
                    <Text style={[styles.font_bld, { color: Colors.main }]} >
                        {title}
                    </Text>
                </View>

                {/* <View style={[styles.row, { alignItems: 'center' }, styles.cntrls_wrpr]}>
                    <View style={styles.sng_wr}>
                        <AntDesign name="minus" size={13} color="black" />
                    </View>
                    <Text style={[styles.font_bld, { marginHorizontal: 8, fontSize: 13 }]}>
                        0
                    </Text>
                    <View style={styles.sng_wr}>
                        <AntDesign name="plus" size={13} color="black" />
                    </View>
                </View> */}
                <SelectionControls onChange={onChange} value={value} />
            </View>
            <View style={[styles.row, { marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 10 }]}>
                <View style={styles.flx}>
                    <Text style={styles.font_reg}>Disponible</Text>
                </View>
                <View style={[styles.flx, styles.m_1, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                    <MaterialCommunityIcons name="shower-head" size={18} color="black" />
                    <Text style={styles.font_reg}>Douche</Text>
                </View>
                <View style={[styles.flx, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                    <MaterialCommunityIcons name="toilet" size={18} color="black" />
                    <Text style={styles.font_reg}>Wc</Text>
                </View>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <View style={styles.flx}>
                    <Text style={styles.font_reg}>{capacity}</Text>
                </View>
                <View style={[styles.flx, { alignItems: 'center', justifyContent: 'center' }]}>
                    {swr ? <Entypo name="check" size={15} color="green" /> : <Entypo name="cross" size={15} color="red" />}
                </View>
                <View style={[styles.flx, { alignItems: 'center', justifyContent: 'center' }]}>
                    {wc ? <Entypo name="check" size={15} color="green" /> : <Entypo name="cross" size={15} color="red" />}
                </View>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={[styles.font_bld, { fontSize: 16 }]}>Prix :</Text>
                <Text style={[[styles.font_reg, { color: 'blue', fontFamily: 'Gilroy-Heavy' }]]}>{price.split(' ')[0]} <Text style={{ fontFamily: 'Gilroy-Thin', color: 'blue' }}>{price.split(' ')[1]}</Text> </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    font_reg: {
        fontFamily: 'Gilroy-Medium'
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
        padding: 3,
        borderRadius: 5
    },
    flx: {
        flex: 1
    },
    m_1: {
        marginLeft: 10
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
