import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { WebView } from 'react-native-webview';

export default function WebViewTestScreen() {
    let [url, setUrl] = useState('http://www.parbateau.com/')

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <WebView pagingEnabled={true} cacheEnabled={true} thirdPartyCookiesEnabled={true} source={{ uri: url }} injectedJavaScript={`
            let results = document.querySelectorAll('.panel-body.resultat');
            if (results.length > 0) {
                window.ReactNativeWebView.postMessage("fuck");
            }
            `} onMessage={(event) => {
                let tmpUrl = url    
                if (event.nativeEvent.data == "fuck") {
                    setTimeout(() => {
                        setUrl(`${tmpUrl}resultats`)
                        console.log("Url changed")
                    }, 5000);
                }
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60
    }
})