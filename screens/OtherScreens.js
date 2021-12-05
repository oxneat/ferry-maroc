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
            <WebView onMessage={(msg) => {
                console.log('Shisso')
            }} source={{ uri: `http://www.parbateau.com/${endPoint}` }} injectedJavaScript={`
                if(document.querySelector('footer') != null){
                    document.querySelector('footer').remove()
                }

                if(document.querySelector('.breadcrumbs-fs.fl-wrap') != null){
                    document.querySelector('.breadcrumbs-fs.fl-wrap').remove()
                }

                if(document.querySelector('.parallax-section.single-par') != null){
                    document.querySelector('.parallax-section.single-par').remove()
                }

                if(document.querySelector('header') != null){
                    document.querySelector('header').remove()
                }
                
                if(document.querySelector('.box-widget-item.fl-wrap') != null){
                    document.querySelector('.box-widget-item.fl-wrap').remove()
                }

                if (document.querySelector('.middle-padding.grey-blue-bg') != null) {
                    document.querySelector('.middle-padding.grey-blue-bg').style.paddingTop = '0px'
                }
                window.ReactNativeWebView.postMessage('fsdf');
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
