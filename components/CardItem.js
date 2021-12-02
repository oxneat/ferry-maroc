import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AntDesign, Entypo } from '@expo/vector-icons';

import SelectionControls from '../components/SelectionControls';

export default function CardItem({ title, price, onChange, value, swr, wc, win, capacity }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <View style={styles.flx}>
                    <Text style={styles.font_bld} >
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
                    <Text style={styles.font_reg}>Capacité</Text>
                </View>
                <View style={[styles.flx, styles.m_1]}>
                    <Text style={styles.font_reg}>Lits</Text>
                </View>
                <View style={styles.flx}>
                    <Text style={styles.font_reg}>Fenêtre</Text>
                </View>
                <View style={styles.flx}>
                    <Text style={styles.font_reg}>Douche</Text>
                </View>
                <View style={styles.flx}>
                    <Text style={styles.font_reg}>Sanitaire</Text>
                </View>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <View style={styles.flx}>
                    <Text style={styles.font_reg}>{capacity}</Text>
                </View>
                <View style={[styles.flx, styles.m_1]}>
                    <Text style={styles.font_reg}>Cabine</Text>
                </View>
                <View style={styles.flx}>
                    {win ? <Entypo name="check" size={15} color="green" /> : <Entypo name="cross" size={15} color="red" />}
                </View>
                <View style={styles.flx}>
                    {swr ? <Entypo name="check" size={15} color="green" /> : <Entypo name="cross" size={15} color="red" />}
                </View>
                <View style={styles.flx}>
                    {wc ? <Entypo name="check" size={15} color="green" /> : <Entypo name="cross" size={15} color="red" />}
                </View>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={[styles.font_bld, { fontSize: 16 }]}>Prix :</Text>
                <Text style={styles.font_reg}>{price.split(' ')[0]} <Text style={{ fontFamily: 'Gilroy-Thin', color: 'blue' }}>{price.split(' ')[1]}</Text> </Text>
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
