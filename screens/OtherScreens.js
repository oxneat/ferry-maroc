import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'

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
            {shwOverfld && <View style={styles.overFldWrpr} >
                <ActivityIndicator color='black' size={30} />
            </View>}
            <View style={styles.rw}>
                <TouchableOpacity style={styles.round} onPress={() => {
                    webviewRef.current.goBack();
                    // console.log(webviewRef.current.nativeEvent.url)
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
                console.log(msg)
            }} style={{ fontFamily: 'Gilroy-Bold' }} source={{
                uri: `https://www.euromed-voyages.com/${endPoint}`
            }} injectedJavaScript={`
                let ele = document.createElement('script')
                ele.src = "https://code.jquery.com/jquery-3.6.0.min.js"
                ele.integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                ele.crossOrigin = "anonymous"
                document.body.appendChild(ele)

                document.querySelectorAll('iframe').forEach((it,ind)=>{
                    if(it.id == 'launcher'){

                        // window.ReactNativeWebView.postMessage(JSON.stringify({type:'Clicked Chat',ele:JSON.stringify(it.id)}));
                        it.contentDocument.querySelector('button').addEventListener('click',()=>{
                            window.ReactNativeWebView.postMessage(JSON.stringify({type:'Clicked Chat worked'}));
                        })
                        // ($(it).contents()[0].querySelector('button[aria-label="Chat"]')
                    }
                })

                if(document.querySelector('.btn-easy.float-btn.color2-bg') != null){
                    document.querySelector('.btn-easy.float-btn.color2-bg').addEventListener('click',(e)=>{
                        e.preventDefault()
                    })
                }

                // if (document.querySelector('button[aria-label="Chat"]') != null) {
                //     document.querySelector('button[aria-label="Chat"]').addEventListener('click',()=>{
                //         // console.log('Clicked As -----------')
                //         if (document.querySelector('.sc-xszt60-1.jTnFlH') != null) {
                //             document.querySelector('.sc-xszt60-1.jTnFlH').children[1].remove()
                //         }
                //     })
                // }

                // if(document.querySelectorAll('iframe').length > 0){
                //     document.querySelectorAll('iframe').forEach((it)=>{
                //         it.remove()
                //     })
                // }

                if(document.querySelector('.top-area-reponsive') != null){
                    document.querySelector('.top-area-reponsive').remove()
                }

                if(document.querySelector('.breadcrumbs-fs.fl-wrap') != null){
                    document.querySelector('.breadcrumbs-fs.fl-wrap').remove()
                }

                if(document.querySelector('.parallax-section.single-par') != null){
                    document.querySelector('.parallax-section.single-par').remove()
                }
                
                if(document.querySelector('.box-widget-item.fl-wrap') != null){
                    document.querySelector('.box-widget-item.fl-wrap').remove()
                }

                if (document.querySelector('.middle-padding.grey-blue-bg') != null) {
                    document.querySelector('.middle-padding.grey-blue-bg').style.paddingTop = '0px'
                }

                // if(document.querySelector('iframe') != null){
                //     document.querySelector('iframe').remove();
                // }

                if(document.querySelector('header') != null){
                    document.querySelector('header').previousElementSibling.remove();
                    document.querySelector('header').remove();
                }
    
                // if(document.querySelector('.container-1-ZOL')){
                //     document.querySelector('.container-1-ZOL').remove();
                // }

                // document.querySelectorAll('iframe').forEach((it,ind)=>{
                //     if(ind>0){
                //             $(it).contents()[0].querySelector('button[aria-label="Chat"]').addEventListener('click',()=>{
                //                 window.ReactNativeWebView.postMessage(JSON.stringify({type:'Shayte'}));
                //             })
                //     }
                // })
                
                if (document.querySelector('.top-area') != null) {
                    document.querySelector('.top-area').remove()
                }

                if(document.querySelector('.breadcrumb') != null){
                    document.querySelector('.breadcrumb').remove()
                }

                if(document.querySelector('footer') != null){
                    document.querySelector('footer').nextElementSibling.remove()
                    document.querySelector('.main-footer-sub').remove()
                    document.querySelector('footer').remove()
                }
    
                if(document.querySelector('#detailsRes') != null){
                    document.querySelector('#detailsRes').remove();
                }

                document.body.style.background = 'white'

                window.ReactNativeWebView.postMessage('fsdf');
            `} onLoadEnd={() => {
                    if (Platform.OS == 'ios') {
                        setShwOverfld(false)
                    } else {
                        setTimeout(() => {
                            setShwOverfld(false)
                        }, 1000);
                    }
                }} onLoadStart={() => {
                    setShwOverfld(true)
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        position: 'relative',
        paddingBottom: 60
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
        zIndex: 100,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
