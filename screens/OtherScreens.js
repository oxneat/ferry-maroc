import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { WebView } from 'react-native-webview';

import { mainEndPoint } from '../api/EndPoint'

import Constants from 'expo-constants';

import { TabStateContext } from '../context/TabManager';

import { AntDesign } from '@expo/vector-icons';

import Colors from '../helpers/Colors';

export default function OtherScreens({ endPoint }) {
    // let endPoi
    const { setShowBottomTab } = useContext(TabStateContext)

    useEffect(() => {
        setShowBottomTab(true)
    }, [])

    let webviewRef = useRef()

    const [shwOverfld, setShwOverfld] = useState(true);

    return (
        <View style={styles.container}>
            {shwOverfld && <View style={styles.overFldWrpr} />}
            <View style={styles.rw}>
                <TouchableOpacity style={styles.round} onPress={() => {
                    webviewRef.current.goBack();
                    console.log(webviewRef.current.nativeEvent.url)
                }}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.round} onPress={() => {
                    webviewRef.current.goForward();
                }}>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <WebView ref={webviewRef} onMessage={(msg) => {
                console.log('Shisso')
            }} source={{
                uri: `http://www.parbateau.com/${endPoint}`
            }} injectedJavaScript={`
                if(document.querySelector('footer') != null){
                    document.querySelector('footer').remove()
                }

                if(document.querySelector('.btn-easy.float-btn.color2-bg') != null){
                    document.querySelector('.btn-easy.float-btn.color2-bg').addEventListener('click',(e)=>{
                        e.preventDefault()
                    })
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

                if(document.querySelector('iframe') != null){
                    document.querySelector('iframe').remove();
                }

                document.body.style.background = 'white'

                window.ReactNativeWebView.postMessage('fsdf');
            `} onLoadEnd={() => {
                    setShwOverfld(false)
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        position: 'relative'
    },
    rw: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        // marginBottom: 10
    },
    round: {
        backgroundColor: Colors.main,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overFldWrpr: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    }
})
