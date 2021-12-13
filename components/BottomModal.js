import React, { useEffect } from 'react';
import { TouchableOpacity, View, ScrollView, Dimensions, StyleSheet } from 'react-native'

import { Entypo } from '@expo/vector-icons';

import Constants from 'expo-constants';

let { height } = Dimensions.get('window');

import { isSmall } from '../helpers/Dimension';

export default function BottomModal({ onPress, children, secBtn, onPresso, bottom = 60 }) {
    // useEffect(() => {
    //     console.log("---------------------Aspect Ratio-----------------")
    //     // console.log(parseFloat(parseFloat(height/width).toFixed(2)))
    //     console.log("---------------------Aspect Ratio-----------------")
    // }, [])

    return (
        <View style={[styles.container, { bottom: bottom }]} >
            <View style={styles.cntnt_wpr}>
                <View style={styles.cntnt_wpr_wrpr}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {
                            children
                        }
                    </ScrollView>
                </View>
                <View style={styles.mdl_ctrlr}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
                        <TouchableOpacity onPress={onPress} style={styles.cls_btn} >
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                        {secBtn && <TouchableOpacity onPress={onPresso} style={[styles.cls_btn, { backgroundColor: '#03fc3d', marginLeft: 10 }]} >
                            <Entypo name="check" size={24} color="white" />
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    cls_btn: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    cntnt_wpr: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        bottom: 0,
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden'
    },
    cntnt_wpr_wrpr: {
        maxHeight: (height - Constants.statusBarHeight) * (isSmall ? 0.6 : 0.8),
        backgroundColor: 'white',
        width: '100%'
    },
    mdl_ctrlr: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 6
    }
})
