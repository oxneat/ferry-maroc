import React from 'react'
import { TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'

import { Entypo } from '@expo/vector-icons';

import Constants from 'expo-constants';

let { height } = Dimensions.get('window');

export default function BottomModal({ onPress, children, secBtn, onPresso }) {
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%', width: '100%', position: 'absolute', zIndex: 6, bottom: 0 }} >
            <View style={{ position: 'absolute', width: '100%', backgroundColor: 'white', bottom: 0, paddingTop: 10,paddingHorizontal: 20 }}>
                <View style={{ maxHeight: (height - Constants.statusBarHeight) * 0.8, backgroundColor: 'white', width: '100%', }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {
                            children
                        }
                    </ScrollView>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }} >
                        <TouchableOpacity onPress={onPress} style={{ backgroundColor: 'white', elevation: 5, width: 50, height: 50, borderRadius: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} >
                            <Entypo name="cross" size={24} color="black" />
                        </TouchableOpacity>
                        {secBtn && <TouchableOpacity onPress={onPresso} style={{ backgroundColor: '#03fc3d', elevation: 5, width: 50, height: 50, borderRadius: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }} >
                            <Entypo name="check" size={24} color="white" />
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </View>
    )
}
