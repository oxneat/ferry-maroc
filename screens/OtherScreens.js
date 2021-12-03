import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { WebView } from 'react-native-webview';

import { mainEndPoint } from '../api/EndPoint'

import Constants from 'expo-constants';
import { TabStateContext } from '../context/TabManager';

export default function OtherScreens({ endPoint }) {
    // let endPoi
    const { setShowBottomTab } = useContext(TabStateContext)

    useEffect(() => {
        setShowBottomTab(true)
    }, [])

    return (
        <View style={styles.container}>
            <WebView source={{ uri: `http://www.parbateau.com/${endPoint}` }} injectedJavaScript={`
                document.querySelector('footer').remove()
                document.querySelector('.breadcrumbs-fs.fl-wrap').remove()
                document.querySelector('.parallax-section.single-par').remove()
                document.querySelector('header').remove()
            `} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    }
})
