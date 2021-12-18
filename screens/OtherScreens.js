import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'

import { WebView } from 'react-native-webview';

// import { mainEndPoint } from '../api/EndPoint'

let { width } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';

import Constants from 'expo-constants';

import { TabStateContext } from '../context/TabManager';

import { AntDesign } from '@expo/vector-icons';

import Colors from '../helpers/Colors';
import { isBig } from '../helpers/Dimension';

import * as Linking from 'expo-linking';

let compareToUrl = (url) => {
    return (url == "https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs" || url == "http://www.diplomatie.be/fr/travel/traveldocs.asp" || url == "https://www.eda.admin.ch/eda/fr/home.html" || url == "https://consulat-paris-algerie.fr/" || url == "https://www.consulatmaroclyon.com/" || url == "http://cgt-paris.diplomatie.gov.tn/#&panel1-2") && Platform.OS == "ios"
}

export default function OtherScreens({ endPoint }) {
    // let endPoi
    const { setShowBottomTab } = useContext(TabStateContext)

    useEffect(() => {
        setShowBottomTab(true)
    }, [])

    let navigation = useNavigation();

    let webviewRef = useRef()

    const [shwOverfld, setShwOverfld] = useState(true);

    const [tmpEndPoint, setTmpEndPoint] = useState(endPoint);

    const [currentDiploUrl, setCurrentDiploUrl] = useState('');

    const [showWeb, setShowWeb] = useState(true);

    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
            if (compareToUrl(currentDiploUrl)) {
                setTmpEndPoint('page/formalites-de-voyage');

                setShowWeb(false)

                setTimeout(() => {
                    setShowWeb(true)
                }, 1000);
            }
        // });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        // return unsubscribe;
    }, [currentDiploUrl]);

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
            {showWeb && <WebView ref={webviewRef} onNavigationStateChange={(event) => {
                // if (event.url !== 'https://www.euromed-voyages.com/page/formalites-de-voyage') {
                //     this.webview.stopLoading();
                //     Linking.openURL(event.url);
                // }

                if (compareToUrl(event.url)) {
                    // webviewRef.current.stopLoading()
                    Linking.openURL(event.url).then(()=>{
                        setCurrentDiploUrl(event.url)
                    }).catch((err)=>{
                        // console.log(err)
                        setCurrentDiploUrl(event.url)
                    })
                }

                // console.log('----------------------- event.url -----------------------------')
                // console.log(event.url)
                // console.log('------------------------ event.url ----------------------------')

            }} thirdPartyCookiesEnabled={true} onMessage={(msg) => {
                console.log('--------------MSG-------------------')
                console.log(msg.nativeEvent.data)
                console.log('--------------MSG-------------------')
            }} style={{ fontFamily: 'Gilroy-Bold' }} source={{
                uri: `https://www.euromed-voyages.com/${tmpEndPoint}`
            }} injectedJavaScript={`
                // let ele = document.createElement('script')
                // ele.src = "https://code.jquery.com/jquery-3.6.0.min.js"
                // ele.integrity = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                // ele.crossOrigin = "anonymous"
                // document.body.appendChild(ele)

                if (document.querySelectorAll('ins').length > 0) {
                    document.querySelectorAll('ins').forEach((it)=>it.remove())
                }

                if(document.querySelectorAll('iframe').length > 0){
                    document.querySelectorAll('iframe').forEach((it)=>{
                        it.remove()
                    })
                }

                // document.querySelectorAll('iframe').forEach((it,ind)=>{
                //     if(it.id == 'launcher'){

                //         // window.ReactNativeWebView.postMessage(JSON.stringify({type:'Clicked Chat',ele:JSON.stringify(it.id)}));
                //         it.contentDocument.querySelector('button').addEventListener('click',()=>{
                //             window.ReactNativeWebView.postMessage(JSON.stringify({type:'Clicked Chat worked'}));
                //         })
                //         // ($(it).contents()[0].querySelector('button[aria-label="Chat"]')
                //     }
                // })

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

                let tmp_links = document.querySelectorAll('a[target="_blank"]')
                
                if (tmp_links.length > 0) {
                    tmp_links.forEach((it)=>{
                        it.target = "_self"

                        if (it.innerText == "Adresse Port") {
                            it.parentElement.remove()
                        }
                    })
                }

                let tmp_linkso = document.querySelectorAll('a')
                
                if (tmp_linkso.length > 0) {
                    tmp_linkso.forEach((it)=>{
                        if((it.href == "https://www.euromed-voyages.com/page/CGV")){
                            it.href = "#"
                            it.style.border = "none"
                            it.style.color = "black"
                        }
                    })
                }

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

                let trAttr = document.querySelectorAll('table>tbody>tr')

                if (trAttr.length > 0) {
                    trAttr.forEach((it,index)=>{
                        it.style.display='block'
                        if (${!isBig} == true) {
                            it.style.width='${width - 35}px'
                        }
                        it.children[0].style.display = 'block'

                        if (index == trAttr.length-1) {
                            it.previousElementSibling.remove()
                            it.remove()
                        }
                    })
                }


                if (document.URL == "https://www.euromed-voyages.com/page/formalites-de-voyage") {
                    let tmp_linksa = document.querySelectorAll('a')
                
                    if (tmp_linksa.length > 0) {
                        tmp_linksa.forEach((it)=>{
                            it.target = "_blank"

                            if (it.innerText == "Adresse Port") {
                                it.parentElement.remove()
                            }
                        })
                    }
                }

                // JSON.stringify({
                //     url: document.URL
                // })
                window.ReactNativeWebView.postMessage('sqdfsf');
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
                }} />}
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
