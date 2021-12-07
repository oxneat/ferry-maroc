import React, { useContext, useEffect } from 'react';

import { StyleSheet, Text, View, Keyboard } from 'react-native';

import { WebView } from 'react-native-webview';
import { TabStateContext } from '../context/TabManager';



export default function NormalWebViewScreen() {
    const { setShowBottomTab } = useContext(TabStateContext);

    useEffect(() => {
        let _keyboardDidShow = () => {
            console.log('KeyBoard is Shown')
            setShowBottomTab(false)
        }

        let _keyboardDidHide = () => {
            console.log('KeyBoard is Hidden')
            setShowBottomTab(true)
        }

        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow')
            Keyboard.removeAllListeners('keyboardDidHide')
        };
    }, [])

    return (
        <View style={styles.container}>
            <WebView style={{fontFamily:'Gilroy-Bold'}} injectedJavaScript={`
                if (document.querySelector('.main-header') != null) {
                    document.querySelector('.main-header').remove()
                }

                if(document.querySelector('footer') != null){
                    document.querySelector('footer').remove()
                }
                
                window.ReactNativeWebView.postMessage('fsdf');

            `} source={{ uri: 'http://www.parbateau.com/' }} onMessage={()=>{
                console.log('Shiso')
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
