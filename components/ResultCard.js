import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function ResultCard({ from, fullDate, onMore, to, uri, departureHour, arrivalHour, duration, code }) {
    return (
        <View style={styles.card}>
            <View style={styles.rw}>
                <View style={[styles.sect, { alignItems: 'flex-start' }]}>
                    <Text style={styles.txt}>
                        {from}
                    </Text>
                    {/* <Text style={[styles.txt, styles.txt_sec, { marginTop: 5, fontSize: 12 }]}>
                        ({fromCountry})
                    </Text> */}
                </View>
                <View style={styles.img}>
                    <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={{ uri }} />
                </View>
                <View style={[styles.sect, { alignItems: 'flex-end' }]}>
                    <Text style={styles.txt}>
                        {to}
                    </Text>
                    {/* <Text style={[styles.txt, styles.txt_sec, { marginTop: 5, fontSize: 12 }, { textAlign: 'right' }]}>
                        ({toCountry})
                    </Text> */}
                </View>
            </View>

            <View style={[styles.rw, { marginTop: 10 }]}>
                <View style={[styles.sect, { alignItems: 'flex-start' }]}>
                    <Text style={[styles.txt, { fontSize: 15, color: '#acadb1', marginBottom: 6 }]}>
                        Depart
                    </Text>
                    <Text style={[styles.txt, styles.txt_sec, styles.blk]}>
                        {departureHour}
                    </Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }} >
                    <Text style={[styles.txt, { color: 'gray', fontSize: 13 }]}>{duration}</Text>
                </View>
                <View style={[styles.sect, { alignItems: 'flex-end' }]}>
                    <Text style={[styles.txt, { fontSize: 15, color: '#acadb1', marginBottom: 6 }]}>
                        Arrivée
                    </Text>
                    <Text style={[styles.txt, styles.txt_sec, styles.blk]}>
                        {arrivalHour}
                    </Text>
                </View>
            </View>

            <View style={[styles.rw, { marginTop: 15 }]}>
                <View style={[styles.circle, { backgroundColor: 'gray' }]}></View>
                <View style={styles.line}></View>
                <View style={[styles.circle, { borderWidth: 1, borderColor: 'gray', alignItems: 'center', justifyContent: 'center', width: 12, height: 12, borderRadius: 12 / 2 }]}>
                    <View style={[styles.circle]}></View>
                </View>
                <View style={styles.boat_cont}>
                    <MaterialCommunityIcons style={styles.icn} name="sail-boat" size={24} color="#acadb1" />
                </View>
            </View>
            <View style={[styles.rw, { marginTop: 10 }]}>
                <Text style={[styles.txt_cd_pr, { fontSize: 15 }]}>
                    {fullDate + ' '}
                </Text>
                <View style={[styles.line,{marginHorizontal:5}]}></View>
                <Text style={[styles.txt_cd_sec,{color:'black'}]}>Date Départ</Text>
            </View>
            <View style={[styles.rw, { marginTop: 10 }]}>
                <Text style={styles.txt_cd_pr}>
                    {code + ' '}
                    <Text style={styles.txt_cd_sec}>Code Voyage</Text>
                </Text>
                <TouchableOpacity onPress={onMore} style={styles.rw}>
                    <Text style={styles.txt_mr}>
                        Voir details
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rw: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    img: {
        width: 60,
        height: 30,
        // backgroundColor:'red'
    },
    card: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10
    },
    txt: {
        fontFamily: 'Gilroy-Bold',
        textTransform: 'capitalize',
        color: '#089082',
        fontSize: 18
    },
    txt_sec: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#0ac9b6'
    },
    sect: {
        flex: 1,
        // backgroundColor:'red'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: 'rgba(230, 230, 230,0.9)',
    },
    line: {
        width: '100%',
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'dashed',
        borderColor: '#D1D2DE',
    },
    blk: {
        color: 'black'
    },
    boat_cont: {
        position: 'absolute',
        // alignSelf:'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 1.5
        // right:'50%'
    },
    icn: {
        transform: [{
            rotateY: '180deg'
        }]
    },
    txt_cd_pr: {
        color: '#fda26c',
        fontSize: 20,
        fontFamily: 'Gilroy-Bold',
        textTransform: 'capitalize'
    },
    txt_cd_sec: {
        color: '#d1d9de',
        textTransform: 'capitalize',
        fontSize: 12,
        fontFamily: 'Gilroy-Medium'
    },
    txt_mr: {
        color: '#fda26c',
        fontFamily: 'Gilroy-Medium'
    }
})
