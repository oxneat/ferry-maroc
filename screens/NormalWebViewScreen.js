import React, { useContext, useEffect, useState, useRef } from 'react';

import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert, Platform, TouchableOpacity } from 'react-native';

import { WebView } from 'react-native-webview';
import { TabStateContext } from '../context/TabManager';

import Constants from 'expo-constants';

import { useRoute, useNavigation } from '@react-navigation/native';
import ResultCard from '../components/ResultCard';
import Colors from '../helpers/Colors';
import CardItem from '../components/CardItem';
import BottomModal from '../components/BottomModal';
import { AlertContext } from '../context/AlertManager';
import TopBar from '../components/TopBar';

import { isSmall, isBig } from '../helpers/Dimension';

import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function NormalWebViewScreen() {
    const { setShowBottomTab } = useContext(TabStateContext);

    // useEffect(() => {
    //     let _keyboardDidShow = () => {
    //         console.log('KeyBoard is Shown')
    //         setShowBottomTab(false)
    //     }

    //     let _keyboardDidHide = () => {
    //         console.log('KeyBoard is Hidden')
    //         setShowBottomTab(true)
    //     }

    //     Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    //     Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    //     // cleanup function
    //     return () => {
    //         Keyboard.removeAllListeners('keyboardDidShow')
    //         Keyboard.removeAllListeners('keyboardDidHide')
    //     };
    // }, [])


    useEffect(() => {
        setShowBottomTab(false)
    })

    let navigation = useNavigation();


    const [step, setStep] = useState(0);

    const [injectedJs, setInjectedJs] = useState('');

    const [results, setResults] = useState([]);

    const webViewRef = useRef();

    const [selectedResult, setSelectedResult] = useState(-1);

    const [selectedOptionsRoom, setSelectedOptionsRoom] = useState([]);

    const { setAlert } = useContext(AlertContext)

    const [removeContent, setRemoveContent] = useState(false);

    useEffect(() => {
        let tmpInjected = '';

        let str = '';

        Object.keys(params.obj_ve_pass).forEach((it) => {
            str += `document.querySelector('input[name=${it}]').value = ${params.obj_ve_pass[it]};`
            // console.log(it)
        })

        console.log('------------------Effect Step------------------')
        console.log(step)
        console.log('------------------Effect Step------------------')

        if (step == 0) {
            tmpInjected = `
                document.querySelector('select[name=allee]').value = '${params.dest1}'
                if (${params.selectedDates.length == 2} == true) {
                    document.querySelector('select[name=port_retour]').value = '${params.dest2}'
                    document.querySelector('input[name=date_retour]').value = '${params.selectedDates[1]}'
                    document.querySelector('input[name=type_traversee]').value = 'ALLEE_RETOUR'
                }else{
                    document.querySelectorAll('input[name=typetraversee]')[1].click()
                    document.querySelector('input[name=type_traversee]').value = 'ALLEE_SIMPLE'
                }

                document.querySelector('select[name=port_retour]').innerHTML = '<option value="${params.dest2}"></option>'
                document.querySelector('input[name=date_allee]').value = '${params.selectedDates[0]}'

                document.querySelector('input[name=passagers]').value = '${params.passengers}'
                document.querySelector('input[name=vehicules]').value = '${params.vehicles}'
                
                ${str}
                
                let ele = document.createElement('div')

                ele.innerHTML = '<input type="text" placeholder="Hauteur" name="vehicule_type[114][hauteur0]" value="2"> <input type="text" placeholder="Longeur" name="vehicule_type[114][largeur0]" value="5"><input type="hidden" name="code[114]" value="1">'

                document.querySelector('#recherche_moteur').appendChild(ele)

                document.querySelector('.btn.btn-traverser.btnheight').click()

                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'increaseStep',
                }))
            `
        } else if (step == 1) {
            tmpInjected = `
            // window.ReactNativeWebView.postMessage(JSON.stringify({
            //     type: 'toShiiiit',
            // }))
            Array.from(document.querySelectorAll('a[role=button]')).filter((it)=>{
                return it.className.includes('voyages')
            }).forEach((it)=>it.click())
            
            let results = document.querySelectorAll('.panel-body.resultat');
            if(results.length>0){
                let data = Array.from(results).map((item) => {
                    let obj = {}
                    let tmpLst = item.nextElementSibling.children[0].querySelector('table>tbody').querySelectorAll('tr')
                    obj.code_voyage=item.querySelector('.code_voyage').value
                    obj.from = item.parentElement.previousElementSibling.previousElementSibling.querySelector('.name').innerText.split('  ')[0]
                    obj.to = item.parentElement.previousElementSibling.previousElementSibling.querySelector('.name').innerText.split('  ')[1]
                    obj.fullDate = item.querySelector('.weekday').innerText
                    obj.img = item.querySelector('img.origin').src
                    let hrsDep = Array.from(item.querySelectorAll('span')).filter((it) => it.id.includes('showedHeur'))
                    obj.tmpInterval = [hrsDep[0].innerText, hrsDep[1].innerText]
                    obj.estimatedTime = item.querySelector('.respo').innerText.split('  ')[0]
                    obj.other = item.querySelector('.respo').innerText.split('  ')[1]
                    obj.details = Array.from(tmpLst).map((tmpIt) => {
                        return {
                            title: ${Platform.OS == 'ios'} == true ? tmpIt.querySelectorAll('td')[0].innerHTML : tmpIt.querySelectorAll('td')[0].innerText, swr: tmpIt.querySelectorAll('td')[1].children.length, wc: tmpIt.querySelectorAll('td')[2].children.length, avai: tmpIt.querySelectorAll('td')[3].innerText, max: tmpIt.querySelectorAll('td')[4].children[0].children.length - 1, price: ${Platform.OS == 'ios'} == true ? tmpIt.querySelectorAll('td')[5].innerHTML :tmpIt.querySelectorAll('td')[5].innerText
                        }
                    })
    
                    return obj
                })
    
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'results',
                    data
                }))
            }else if(document.querySelectorAll('.alert-link').length >0){
                        
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type:'error',
                    data:[]
                }))
            }
            `
        } else if (step == 2) {

            tmpInjected = `
            if(document.querySelector('header') != null){
                document.querySelector('header').previousElementSibling.remove();
                document.querySelector('header').remove();
            }

            if(document.querySelector('.container-1-ZOL')){
                document.querySelector('.container-1-ZOL').remove();
            }

            if(document.querySelector('footer') != null){
                document.querySelector('footer').nextElementSibling.remove()
                document.querySelector('.main-footer-sub').remove()
                document.querySelector('footer').remove()
            }

            if(document.querySelector('#detailsRes') != null){
                document.querySelector('#detailsRes').remove();
            }

            Array.from(document.querySelectorAll('a[role=button]')).filter((it)=>{
                return it.className.includes('voyages')
            }).forEach((it)=>it.click())

            
            let tmp_results = document.querySelectorAll('.panel-body.resultat');
            tmp_results.forEach((itemo,index)=>{
                let tmpLsto = itemo.nextElementSibling.children[0].querySelector('table>tbody').querySelectorAll('tr')
                // let tmp = itemo.querySelector('select')
                let arr1 = ${JSON.stringify(selectedOptionsRoom)}

                let tmpLst2 =itemo.nextElementSibling.children[0].querySelectorAll('a.btn[data-toggle="collapse"]');

                tmpLst2=Array.from(tmpLst2).filter((it)=>it.className.includes('choisir'))

                Array.from(tmpLsto).filter((it)=>{
                    return !it.className.includes('hidden')
                }).forEach((itm,ind)=>{
                    let tmp = itm.querySelector('select')
                    tmp.value = arr1[index][ind]
                })
            })
            document.querySelector('.calculer_le_prix_total').click()

            document.querySelector('button.button_continuer').click();

            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'confirmation',
            }))

            `
        }
        // else if (step == 2) {
        //     console.log('----- The two condition is invoked ----')
        //     tmpInjected = `
        //         let results = document.querySelectorAll('.panel-body.resultat');
        //         let data = Array.from(results).map((item) => {
        //             let obj = {}
        //             let tmpLst = item.nextElementSibling.children[0].querySelector('table>tbody').querySelectorAll('tr')
        //             obj.from = item.parentElement.previousElementSibling.previousElementSibling.querySelector('.name').innerText.split('  ')[0]
        //             obj.to = item.parentElement.previousElementSibling.previousElementSibling.querySelector('.name').innerText.split('  ')[1]
        //             obj.fullDate = item.querySelector('.weekday').innerText
        //             obj.img = item.querySelector('img.origin').src
        //             let hrsDep = Array.from(item.querySelectorAll('span')).filter((it) => it.id.includes('showedHeur'))
        //             obj.tmpInterval = [hrsDep[0].innerText, hrsDep[1].innerText]
        //             obj.estimatedTime = item.querySelector('.respo').innerText.split('  ')[0]
        //             obj.other = item.querySelector('.respo').innerText.split('  ')[1]
        //             obj.details = Array.from(tmpLst).map((tmpIt) => {
        //                 return {
        //                     title: tmpIt.querySelectorAll('td')[0].innerText, swr: tmpIt.querySelectorAll('td')[1].children.length, wc: tmpIt.querySelectorAll('td')[2].children.length, avai: tmpIt.querySelectorAll('td')[3].innerText, max: tmpIt.querySelectorAll('td')[4].children[0].children.length - 1, price: tmpIt.querySelectorAll('td')[5].innerText
        //                 }
        //             })

        //             return obj
        //         })

        //         window.ReactNativeWebView.postMessage(JSON.stringify({
        //             type: 'results',
        //             data
        //         }))
        //     `

        //     webViewRef.current.reload();


        //     setTimeout(() => {
        //         webViewRef.current.reload();
        //     }, 8000);
        //     tmpInjected = `
        //     window.ReactNativeWebView.postMessage(JSON.stringify({
        //         type: 'increaseStep',
        //         data:2
        //     }))
        //     `
        // }

        setInjectedJs(tmpInjected)
    }, [step])

    let { params } = useRoute();

    const [Total, setTotal] = useState([0, 0]);

    const [titleHd, setTitleHd] = useState('Resultats');

    const [loading, setLoading] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        console.log('------------------------------------')
        console.log(params)
        console.log('------------------------------------')
    }, [params])


    useEffect(() => {
        let tmpCounts = [];

        if (results.length > 0) {
            results.forEach((item) => {
                let localCount = []

                for (let i = 0; i < item.details.length; i++) {
                    localCount.push(0)
                }

                tmpCounts.push(localCount);
            })
        }

        if (tmpCounts.length > 0) {
            setSelectedOptionsRoom(tmpCounts)
        }
    }, [results])

    return (
        <View style={styles.container}>
            <TopBar title={titleHd} onBack={() => {
                if (titleHd == 'Confirmation & paiement') {
                    Alert.alert('', "Souhaitez-vous abandonner cette réservation ?", [{
                        style: 'cancel',
                        text: "Non"
                    }, {
                        style: 'default',
                        onPress: () => navigation.goBack(),
                        text: 'Oui'
                    }])
                } else {
                    navigation.goBack()
                }
            }} />
            <View style={styles.wv}>
                {injectedJs.length > 0 && <WebView ref={webViewRef} style={{ fontFamily: 'Gilroy-Bold' }} injectedJavaScript={`

                if(document.querySelectorAll('iframe').length > 0){
                    document.querySelectorAll('iframe').forEach((it)=>{
                        it.remove()
                    })
                }
                
                (function() {
                    var _old_alert = window.alert;
                    window.alert = function() {
                        _old_alert.apply(window,arguments);
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'backToSchool',
                        }))
                    };
                })();

                if(document.querySelector('#steps') != null){
                    document.querySelector('#steps').remove()
                }
            
                if(document.querySelector('.text-bouton-recherche') != null){
                    document.querySelector('.text-bouton-recherche').remove()
                }

                if(document.querySelector('.backToBoutiqueButton') != null){
                    document.querySelector('.backToBoutiqueButton').addEventListener('click',()=>{
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'backToSchool',
                        }))
                    })
                }
            `+ injectedJs} source={{ uri: 'https://www.euromed-voyages.com/' }} onMessage={(resp) => {
                        // console.log('-------------------------------')
                        // console.log(resp.nativeEvent.data)
                        // console.log('-------------------------------')

                        let response = JSON.parse(resp.nativeEvent.data);

                        console.log('------------------------------------')
                        console.log(response)
                        console.log('------------------------------------')

                        if (response.type == 'increaseStep') {
                            setStep(step + 1)
                        } else if (response.type == 'results') {
                            setResults(response.data)
                        } else if (response.type == 'confirmation') {
                            setLoading(false);
                            setTitleHd('Confirmation & paiement')
                        } else if (response.type == 'error') {
                            setIsEmpty(true)
                        } else if (response.type == 'backToSchool') {
                            navigation.goBack();
                        }

                    }} onLoadStart={() => {
                        if (step == 2) {
                            setLoading(true)
                        }
                    }} onLoadEnd={() => {
                        if (step == 2) {
                            if (Platform.OS == 'android') {
                                setTimeout(() => {
                                    setRemoveContent(true);
                                }, 8000);
                            } else {
                                setTimeout(() => {
                                    setRemoveContent(true);
                                }, 1000)
                            }
                        }
                    }} />}
            </View>
            {
                !removeContent && <>
                    <View style={{ backgroundColor: Colors.main, height: '100%', flex: 1, position: 'absolute', bottom: 0, width: '100%', paddingTop: 70 }}>
                        {results.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5, paddingHorizontal: 20 }}>
                            <Text style={{ fontFamily: 'Gilroy-Heavy', color: 'black', fontSize: 20 }}>
                                Prix Total :
                            </Text>
                            <Text style={{ fontFamily: 'Gilroy-Bold', color: 'white', fontSize: 18 }}>
                                {(Total[0] + Total[1]).toFixed(2)} Eur
                            </Text>

                        </View>}
                        {!isEmpty ? <>
                            {results.length > 0 && <ScrollView style={[styles.scr_wrp, { paddingTop: 0 }]}>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <ResultCard total={Total[index]} onMore={() => {
                                                setSelectedResult(index)
                                                console.log(item)
                                            }} fullDate={`${item.fullDate.split('\n')[0]} ${item.fullDate.split('\n')[1]} ${item.fullDate.split('\n')[2]}`} key={index + ' rc'} fromCountry='MAR' toCountry='FRA' from={item.from} code={item.code_voyage} departureHour={item.tmpInterval[0].split('\n')[0]} arrivalHour={item.tmpInterval[1].split('\n')[0]} duration={item.estimatedTime.split('/n')[0].split('\n')[0] + ' ' + item.estimatedTime.split('/n')[0].split('\n')[1]} to={item.to} uri={item.img} />
                                        )
                                    })
                                }
                            </ScrollView>}
                        </> : <View style={[styles.scr_wrp, { flex: 1 }]}>
                            <View style={styles.err_card}>
                                <View style={styles.err_hd}>
                                    <MaterialIcons name="error" size={24} color="red" style={{ marginRight: 10 }} />
                                    <Text style={{ color: 'red', fontFamily: 'Gilroy-Bold' }}>
                                        Une Erreur est survenu
                                    </Text>
                                </View>
                                <View style={[styles.err_hd, { marginBottom: 0, alignItems: 'flex-start' }]}>
                                    <FontAwesome name="circle" style={{ marginTop: 5, marginRight: 5 }} size={8} color="red" />
                                    <Text style={{ color: 'black', fontFamily: 'Gilroy-Medium' }}>
                                        Nous n'avons pas trouvé de recommendations pour votre recherche. Merci de réessayer en modifiant vos dates de vols.
                                    </Text>
                                </View>
                            </View>
                        </View>}
                    </View>
                    {results.length > 0 && selectedResult != -1 && <BottomModal secBtn onPresso={() => setSelectedResult(-1)} bottom={0} onPress={() => setSelectedResult(-1)}>
                        {
                            results[selectedResult].details.map((item, index) => {

                                return <CardItem onChange={(value, valType) => {
                                    // console.log(selectedOptionsRoom)
                                    let tmpPrce = Platform.OS == 'ios' ? item.price.replace(/<[^>]*>?/gm, '').replaceAll('\n', '').replaceAll('  ', '') : item.price

                                    // console.log("----------------- tmpPrce ----------------")
                                    // console.log(parseFloat(tmpPrce.split(' ')[0]))
                                    // console.log("----------------- tmpPrce ----------------")

                                    let nbCurrent = 0;

                                    selectedOptionsRoom[selectedResult].forEach((it) => {
                                        nbCurrent += it;
                                    })

                                    // console.log('-------------- valType --------------------')
                                    // console.log(valType)
                                    // console.log('-------------- valType --------------------')

                                    if (nbCurrent < params.nbPassengers || valType == 'minus') {
                                        if (value <= parseInt(item.max) && value >= 0) {
                                            console.log('-------+++++++++++++---------------')
                                            console.log(valType)
                                            console.log('-------+++++++++++++---------------')
                                            let tmpSel = [...selectedOptionsRoom]
                                            tmpSel[selectedResult][index] = value
                                            setSelectedOptionsRoom(tmpSel)

                                            let tmpTot = [...Total]

                                            let operator = valType == 'minus' ? -1 : 1
                                            console.log(operator)

                                            tmpTot[selectedResult] = (operator * (parseFloat(tmpPrce.split(' ')[0]) * value))
                                            tmpTot[selectedResult] = tmpTot[selectedResult] < 0 ? tmpTot[selectedResult] * -1 : tmpTot[selectedResult]

                                            console.log((operator * (parseFloat(tmpPrce.split(' ')[0]) * value)))
                                            setTotal(tmpTot)
                                        }
                                    } else {
                                        let typeTr = selectedResult == 0 ? 'l\'aller' : 'le retour'
                                        setAlert({ type: 'err', msg: `Le nombre d'accommodation choisi pour ${typeTr} est supérieur au nombre de passagers` })
                                        setTimeout(() => {
                                            setAlert({ type: '', msg: '' })
                                        }, 5000);
                                    }

                                }} value={selectedOptionsRoom[selectedResult][index]} price={Platform.OS == 'ios' ? item.price.replace(/<[^>]*>?/gm, '').replaceAll('\n', '').replaceAll('  ', '') : item.price} capacity={item.avai.split('     \n')[1]} swr={parseInt(item.swr) > 0} wc={parseInt(item.wc) > 0} title={Platform.OS == 'ios' ? (item.title.replace(/<[^>]*>?/gm, '')).replaceAll('\n', '').replaceAll('  ', '') : item.title} key={index + ' qsdqs 55'} />
                            })
                        }
                    </BottomModal>}
                    {results.length > 0 && <TouchableOpacity onPress={() => {

                        let areOptionsValid = selectedOptionsRoom.map(() => false);

                        selectedOptionsRoom.forEach((item, index) => {
                            let tmpSum = 0;

                            item.forEach((it) => {
                                tmpSum += it
                            })

                            if (tmpSum > 0) {
                                areOptionsValid[index] = true
                            }
                        })

                        let isValid = true

                        areOptionsValid.forEach((condition) => {
                            if (!condition) {
                                isValid = false
                            }
                        })

                        if (isValid) {
                            // setEndPoint('/resultats')
                            // setShowWebView(false)
                            // setTimeout(() => {
                            //     setShowWebView(true)
                            // }, 0);

                            // setLoading(true);
                            setStep(2);
                            webViewRef.current.reload();
                        } else {
                            setAlert({ type: 'warn', msg: 'Toutes les options ne sont pas selectionnées' })
                            setTimeout(() => {
                                setAlert({ type: '', msg: '' })
                            }, 5000);
                        }
                    }} style={styles.submitBtn}>
                        <Text style={{ fontFamily: 'Gilroy-Bold', marginRight: 10 }}>Continuer</Text>
                        {!loading ? <Ionicons name="arrow-forward" size={24} color="black" /> : <ActivityIndicator color='black' size={24} />}
                    </TouchableOpacity>}
                </>
            }
            {results.length == 0 && !isEmpty && <View style={styles.ldr_wrpr}>
                <View style={[styles.ldr_cntnt]}>
                    <ActivityIndicator color='black' size={26} />
                </View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        position: 'relative'
    },
    scr_wrp: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    wv: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        marginTop: Constants.statusBarHeight + 60,
        paddingBottom: 60
    },
    ldr_cntnt: {
        backgroundColor: 'white',
        height: 150,
        width: 150,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ldr_wrpr: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0
    },
    submitBtn: {
        position: 'absolute',
        bottom: (isBig ? 60 : isSmall ? 15 : 50),
        // width: 50,
        // height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,
        // elevation: 7,
    },
    err_card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        padding: 10
    },
    err_hd: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }
})
