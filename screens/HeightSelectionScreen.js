import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HeightSelectionScreen() {
    return (
        <View style={{ backgroundColor: 'gray', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <View style={{ height: 300, backgroundColor: 'white', width: 20, borderRadius: 10, alignItems: 'center', paddingVertical: 5 }} >
                <View style={{ backgroundColor: 'red', width: 15, height: 15, borderRadius: 15 / 2 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
