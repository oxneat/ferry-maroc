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

let mainUrlStr = 'https://www.euromed-voyages.com/'

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

    const [strVida, setStrVida] = useState('');

    const [showWeb, setShowWeb] = useState(true);

    const [shwOverfld, setShwOverfld] = useState(false);

    // document.querySelector('select[name=allee]').value = '${params.dest1}'
    //             if (${params.selectedDates.length == 2} == true) {
    //                 document.querySelector('select[name=port_retour]').value = '${params.dest2}'
    //                 document.querySelector('input[name=date_retour]').value = '${params.selectedDates[1]}'
    //                 document.querySelector('input[name=type_traversee]').value = 'ALLEE_RETOUR'
    //             }else{
    //                 document.querySelectorAll('input[name=typetraversee]')[1].click()
    //                 document.querySelector('input[name=type_traversee]').value = 'ALLEE_SIMPLE'
    //             }

    //             document.querySelector('select[name=port_retour]').innerHTML = '<option value="${params.dest2}"></option>'
    //             document.querySelector('input[name=date_allee]').value = '${params.selectedDates[0]}'

    //             document.querySelector('input[name=passagers]').value = '${params.passengers}'
    //             document.querySelector('input[name=vehicules]').value = '${params.vehicles}'

    //             ${str}

    //             let ele = document.createElement('div')

    //             ele.innerHTML = '<input type="text" placeholder="Hauteur" name="vehicule_type[114][hauteur0]" value="2"> <input type="text" placeholder="Longeur" name="vehicule_type[114][largeur0]" value="5"><input type="hidden" name="code[114]" value="1">'

    //             document.querySelector('#recherche_moteur').appendChild(ele)

    useEffect(() => {
        let tmpInjected = '';

        let str = '';

        Object.keys(params.obj_ve_pass).forEach((it) => {
            str += `document.querySelector('input[name=${it}]').value = ${params.obj_ve_pass[it]};`
            // console.log(it)
        })

        setStrVida(str)

        // console.log('------------------Effect Step------------------')
        // console.log(step)
        // console.log('------------------Effect Step------------------')

        if (step == 0) {
            tmpInjected = `
                if (document.URL == '${mainUrlStr}') {
                    let obj ={
                        type_traversee: ${params.selectedDates.length == 2} == true ? 'ALLEE_RETOUR' : 'ALLEE_SIMPLE',
                        back: 0,
                        allee : '${params.dest1}',
                        date_allee: '${params.selectedDates[0]}',
                        passagers: '${params.passengers}',
                        vehicules: '${params.vehicles}',
                        nb_voitures: '${params.obj_ve_pass.nb_voitures}',
                        nb_fourgons: '${params.obj_ve_pass.nb_fourgons}',
                        nb_remorques: '${params.obj_ve_pass.nb_remorques}',
                        nb_motos: '${params.obj_ve_pass.nb_motos}',
                        'vehicule_type[114][hauteur0]': 2,
                        'vehicule_type[114][largeur0]': 5,
                        'code[114]': 1,
                        nb_adultes: '${params.obj_ve_pass.nb_adultes}',
                        nb_enfants: '${params.obj_ve_pass.nb_enfants}',
                        nb_bebes: '${params.obj_ve_pass.nb_bebes}',
                        nb_chats: '${params.obj_ve_pass.nb_chats}',
                        nb_chiens: '${params.obj_ve_pass.nb_chiens}',
                    }

                    if (${params.selectedDates.length == 2} == true) {
                        obj.date_retour = '${params.selectedDates[1]}';
                        obj.port_retour = '${params.dest2}';
                    }

                    let tmpStr = ''

                    Object.keys(obj).forEach((it)=>{
                        tmpStr +='<input name="'+ it +'" value="'+ obj[it] +'" />'
                    })
                    document.querySelector('#recherche_moteur').innerHTML=tmpStr+'<button class="btn btn-traverser  btnheight" type="submit" id="valide">RECHERCHER</button>'   
                }

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

            // if(document.querySelector('.container-1-ZOL')){
            //     document.querySelector('.container-1-ZOL').remove();
            // }

            if(document.querySelector('footer') != null){
                document.querySelector('footer').nextElementSibling.remove()
                document.querySelector('.main-footer-sub').remove()
                document.querySelector('footer').remove()
            }

            // if(document.querySelector('#detailsRes') != null){
            //     document.querySelector('#detailsRes').remove();
            // }

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
        console.log('-----------------Params-------------------')
        console.log(params)
        console.log('-----------------Params-------------------')
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

            {shwOverfld && <View style={styles.overFldWrpr} >
                <ActivityIndicator color='black' size={30} />
            </View>}

            <View style={styles.wv}>
                {showWeb && <WebView ref={webViewRef} style={{ fontFamily: 'Gilroy-Bold' }} cacheEnabled={true} domStorageEnabled={true} sharedCookiesEnabled={true} injectedJavaScript={`
                    if(document.querySelector('.text-bouton-recherche') != null){
                        document.querySelector('.text-bouton-recherche').hidden = true
                    }
                    
                    if(document.querySelector('#recevoirDevis') != null){
                        document.querySelector('#recevoirDevis').style.opacity = 0
                    }

                    if (document.querySelector('#steps') != null) {
                        document.querySelector('#steps').hidden = true
                    }

                    // if(document.querySelector('.backToBoutiqueButton') != null){
                    //     document.querySelector('.backToBoutiqueButton').addEventListener('click',(e)=>{
                    //         e.preventDefault();
                    //         window.ReactNativeWebView.postMessage(JSON.stringify({
                    //             type: 'backToSchool',
                    //         }))
                    //     })
                    // }

                    if(document.querySelector('.order-payment-list') != null){
                        document.querySelector('.order-payment-list').previousElementSibling.previousElementSibling.remove()
                        document.querySelector('.order-payment-list').remove()
                    }

                    if (document.querySelector('#detailsRes') != null) {
                        document.querySelector('#detailsRes').style.height = '0px'
                        document.querySelector('#detailsRes').style.opacity = 0
                    }
                `+ injectedJs} source={{ uri: 'https://www.euromed-voyages.com/' }} onMessage={(resp) => {
                        // console.log('-------------------------------')
                        // console.log(resp.nativeEvent.data)
                        // console.log('-------------------------------')

                        let response = JSON.parse(resp.nativeEvent.data);

                        // console.log('------------------------------------')
                        // console.log(response)
                        // console.log('------------------------------------')

                        if (response.type == 'increaseStep' && step < 2) {
                            setStep(step + 1)

                            // if (step > 1) {
                            //     setShowWeb(false)
                            //     setTimeout(() => {
                            //         setShowWeb(true)
                            //     }, 1000);
                            // }
                        } else if (response.type == 'results') {
                            setResults(response.data)
                            // if (step < 2) {
                            //     setStep(step + 1)
                            //     setShowWeb(false)
                            //     setTimeout(() => {
                            //         setShowWeb(true)
                            //     }, 1000);
                            // }
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

                        if (step >= 2 && removeContent) {
                            setShwOverfld(true)
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

                        if (step >= 2 && removeContent && shwOverfld) {
                            setShwOverfld(false)
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
                                                // console.log(item)
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
                                        Nous n'avons pas trouvé de recommendations pour votre recherche. Merci de réessayer en modifiant vos dates de traversées.
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

                                    // console.log("----------------- Value Changed ----------------")
                                    // console.log()
                                    // console.log("----------------- Value Changed ----------------")




                                    let nbCurrent = 0;

                                    // console.log("----------------- Value Changed ----------------")
                                    // console.log(totPassTmp)
                                    // console.log("----------------- Value Changed ----------------")

                                    // console.log('-------------- valType --------------------')
                                    // console.log(valType)
                                    // console.log('-------------- valType --------------------')

                                    selectedOptionsRoom[selectedResult].forEach((it) => {
                                        nbCurrent += it;
                                    })

                                    if (nbCurrent < params.nbPassengers || valType == 'minus') {
                                        if (value <= parseInt(item.max) && value >= 0) {
                                            // console.log('-------+++++++++++++---------------')
                                            // console.log(valType)
                                            // console.log('-------+++++++++++++---------------')
                                            let tmpSel = [...selectedOptionsRoom]
                                            tmpSel[selectedResult][index] = value
                                            setSelectedOptionsRoom(tmpSel)

                                            let tmpTot = [...Total]

                                            let operator = valType == 'minus' ? -1 : 1
                                            // console.log(operator)

                                            tmpTot[selectedResult] = (operator * (parseFloat(tmpPrce.split(' ')[0]) * value))
                                            tmpTot[selectedResult] = tmpTot[selectedResult] < 0 ? tmpTot[selectedResult] * -1 : tmpTot[selectedResult]

                                            // console.log((operator * (parseFloat(tmpPrce.split(' ')[0]) * value)))
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

                        // let areOptionsValid = selectedOptionsRoom.map(() => false);

                        // selectedOptionsRoom.forEach((item, index) => {
                        //     let tmpSum = 0;

                        //     item.forEach((it) => {
                        //         tmpSum += it
                        //     })

                        //     if (tmpSum > 0) {
                        //         areOptionsValid[index] = true
                        //     }
                        // })

                        // let isValid = true

                        // areOptionsValid.forEach((condition) => {
                        //     if (!condition) {
                        //         isValid = false
                        //     }
                        // })


                        let totPassTmp = [0];



                        let tmRmCtnt = [[...selectedOptionsRoom[0]]]

                        let tmpJ = 1


                        if (params.selectedDates.length == 2) {
                            totPassTmp.push(1)
                            tmRmCtnt.push([...selectedOptionsRoom[1]])
                            tmpJ = 2
                        }


                        for (let j = 0; j < tmpJ; j++) {

                            for (let i = 0; i < selectedOptionsRoom[j].length; i++) {
                                if (i > 0) {
                                    let str = results[j].details[i].title;
                                    let tmpInd = str.indexOf('lits') - 1 > -1 ? str.indexOf('lits') - 1 : str.indexOf('passagers') - 2 > -1 ? str.indexOf('passagers') - 2 : -1

                                    if (tmpInd > -1) {
                                        tmRmCtnt[j][i] = parseFloat(str[tmpInd]) * selectedOptionsRoom[j][i];
                                    }
                                }


                                totPassTmp[j] += selectedOptionsRoom[j][i]
                            }
                        }


                        // console.log("------------------------ params.nbPassengers -------------------------------")
                        // console.log(totPassTmp[0] == params.nbPassengers, totPassTmp[1] == params.nbPassengers)
                        // console.log(tmRmCtnt)
                        // console.log("------------------------ params.nbPassengers -------------------------------")

                        let isValid = false;

                        let sums = [0, 0];

                        tmRmCtnt.forEach((constraintBlock, index) => {
                            constraintBlock.forEach((cstrBlk) => {
                                sums[index] += cstrBlk
                            })
                        })

                        // console.log("------------------------------------- Sums -------------------------------------")
                        // console.log(sums)
                        // console.log("------------------------------------- Sums -------------------------------------")

                        if (sums[0] == params.nbPassengers && sums[1] == params.nbPassengers || sums[0] == params.nbPassengers && params.selectedDates.length == 1) {
                            // setEndPoint('/resultats')
                            // setShowWebView(false)
                            // setTimeout(() => {
                            //     setShowWebView(true)
                            // }, 0);

                            // setLoading(true);
                            setStep(2);
                            webViewRef.current.reload();
                        } else if (sums[0] > params.nbPassengers && sums[1] > params.nbPassengers) {
                            setAlert({ type: 'warn', msg: "le nombre d\'hébergements est supérieur au nombre de passagers (aller et retour)" })

                            setTimeout(() => {
                                setAlert({ type: '', msg: '' })
                            }, 5000);
                        } else if (sums[0] > params.nbPassengers) {
                            setAlert({ type: 'warn', msg: "le nombre d\'hébergements est supérieur au nombre de passagers (aller)" })

                            setTimeout(() => {
                                setAlert({ type: '', msg: '' })
                            }, 5000);
                        } else if (sums[1] > params.nbPassengers) {
                            setAlert({ type: 'warn', msg: "le nombre d\'hébergements est supérieur au nombre de passagers (retour)" })

                            setTimeout(() => {
                                setAlert({ type: '', msg: '' })
                            }, 5000);
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
