import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'

import Constants from 'expo-constants';

import Colors from '../helpers/Colors';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { isSmall } from '../helpers/Dimension';

let { width } = Dimensions.get('window')

let title = "NOUS VOUS INFORMONS QU'IL EST POSSIBLE DE VOYAGER DEPUIS SÈTE (FRANCE) OU GÊNES ( ITALIE) À DETINATION DU MAROC ; NOUS VOUS RAPPELONS QUE LES DÉPLACEMENTS SONT SOUMIS AUX LIMITATIONS FIXÉES PAR LE GOUVERNEMENT MAROCAIN :"

export default function MessageScreen() {
    let navigation = useNavigation();

    const [showTheRest, setShowTheRest] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: -30, width: 400, height: 400, right: -20 }}>
                <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={require('../assets/images/curve2.png')} />
            </View>
            <View style={{ position: 'absolute', top: -50, width: 300, height: 300, right: -40 }}>
                <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={require('../assets/images/curve3.png')} />
            </View>

            <View style={{ paddingTop: Constants.statusBarHeight, flex: 1, width: '100%', height: '100%', justifyContent: 'flex-end', paddingBottom: isSmall ? 80 : 150 }} >
                <View style={{ flexDirection: showTheRest ? 'column' : 'row', alignItems: showTheRest ? 'flex-start' : 'center', marginBottom: 15 }}>
                    <View>
                        <Text style={[styles.txt, styles.txt_tw, { marginBottom: 0 }]} >
                            {!showTheRest ? `${title.split(' ')[0]} ${title.split(' ')[1]} ${title.split(' ')[2]} ... ` : title}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setShowTheRest(!showTheRest)
                    }}>
                        <Text style={{ fontFamily: 'Gilroy-Bold', fontSize: 13, color: 'gray' }}>
                            {showTheRest ? 'Reduire' : 'Lire la suite'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.txt, { fontSize: 12 }]} >1 - PRÉSENTATION D'UN TEST PCR COVID-19 NÉGATIF (DATANT DE MOINS DE 72 HEURES DE L’ARRIVÉE AU MAROC)</Text>
                <Text style={[styles.txt, { fontSize: 12 }]} >2 - LES ENFANTS DE MOINS DE 11 ANS SONT DISPENSÉS DU TEST PCR.</Text>
                <Text style={[styles.txt, styles.txt_th, { marginTop: 10 }, { fontSize: 12 }]} >
                    NOUS VOUS INVITONS À DEMANDER À VOS CLIENTS DE SE RAPPROCHER DU CONSULAT DU MAROC LE PLUS PROCHE POUR SE FAIRE CONFIRMER LES CONDITIONS D'ENTRÉES AU MAROC.<Text style={styles.txt_spec}>Https://Www.Diplomatie.Gouv.Fr/Fr/Conseils-Aux-Voyageurs/Conseils-Par-Pays-Destination/Maroc/</Text> OU AU <Text style={styles.txt_spec}>+212 5 37 68 97 00</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('hm');
            }} style={{ alignSelf: 'flex-end', marginTop: 20, flexDirection: 'row', position: 'absolute', bottom: isSmall ? 30 : 40, right: 20 }}>
                <Text style={[styles.txt_tw, { color: 'rgb(255,101,78)', fontSize: 20 }]}>
                    Commencer
                </Text>
                <AntDesign name="arrowright" size={24} style={{ marginLeft: 10 }} color={'rgb(255,101,78)'} />
            </TouchableOpacity>
            {/* <View style={{ backgroundColor: 'red', position: 'absolute', width: 120, height: 300, top: 0, right: -50, borderBottomLeftRadius: 80 }} >

            </View>
            <View style={{ backgroundColor: 'red', position: 'absolute', width: 300, height: 120, top: -60, right: 0, borderBottomLeftRadius: 500, transform: [{ rotateZ: '5deg' }] }} >

            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative'
    },
    txt: {
        fontFamily: 'Gilroy-Bold',
        textTransform: 'capitalize',
        marginBottom: 10,
        lineHeight: 20
    },
    txt_tw: {
        fontFamily: 'Gilroy-Heavy',
    },
    txt_th: {
        fontFamily: 'Gilroy-Medium',
    },
    mrg_tp: {
        marginTop: 40
    },
    mrg_bt: {
        marginBottom: 40
    },
    txt_spec: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
})
