import React, { useContext, useEffect, useState, useRef } from 'react';

import { StyleSheet, Text, View, Keyboard, ScrollView } from 'react-native';

import { WebView } from 'react-native-webview';
import { TabStateContext } from '../context/TabManager';

import Constants from 'expo-constants';

import { useRoute } from '@react-navigation/native';
import ResultCard from '../components/ResultCard';
import Colors from '../helpers/Colors';
import CardItem from '../components/CardItem';
import BottomModal from '../components/BottomModal';
import { AlertContext } from '../context/AlertManager';

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


    useEffect(() => {
        setShowBottomTab(false)
    })


    const [step, setStep] = useState(0);

    const [injectedJs, setInjectedJs] = useState('');

    const [results, setResults] = useState([]);

    const webViewRef = useRef();

    const [selectedResult, setSelectedResult] = useState(-1);

    const [selectedOptionsRoom, setSelectedOptionsRoom] = useState([]);

    const { setAlert } = useContext(AlertContext)

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
                        title: tmpIt.querySelectorAll('td')[0].innerText, swr: tmpIt.querySelectorAll('td')[1].children.length, wc: tmpIt.querySelectorAll('td')[2].children.length, avai: tmpIt.querySelectorAll('td')[3].innerText, max: tmpIt.querySelectorAll('td')[4].children[0].children.length - 1, price: tmpIt.querySelectorAll('td')[5].innerText
                    }
                })

                return obj
            })

            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'results',
                data
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
            <View style={styles.wv}>
                {injectedJs.length > 0 && <WebView ref={webViewRef} style={{ fontFamily: 'Gilroy-Bold' }} injectedJavaScript={injectedJs} source={{ uri: 'https://www.euromed-voyages.com/' }} onMessage={(resp) => {
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
                    }

                }} />}
            </View>
            <View style={{ backgroundColor: Colors.main, height: '100%', flex: 1, position: 'absolute', top: 0, width: '100%', paddingTop: Constants.statusBarHeight + 10 }}>
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
                                    let tmpSel = [...selectedOptionsRoom]
                                    tmpSel[selectedResult][index] = value
                                    setSelectedOptionsRoom(tmpSel)

                                    let tmpTot = [...Total]
                                    tmpTot[selectedResult] = tmpTot[selectedResult] + parseFloat(tmpPrce.split(' ')[0]) * value
                                    setTotal(tmpTot)
                                }
                            } else {
                                let typeTr = selectedResult == 0 ? 'l\'aller' : 'le retour'
                                setAlert({ type: 'err', msg: `Le nombre d'accommodation choisi pour ${typeTr} est supérieur au nombre de passagers` })
                                setTimeout(() => {
                                    setAlert({ type: '', msg: '' })
                                }, 5000);
                            }

                        }} value={selectedOptionsRoom[selectedResult][index]} price={Platform.OS == 'ios' ? item.price.replace(/<[^>]*>?/gm, '').replaceAll('\n', '').replaceAll('  ', '') : item.price} capacity={item.capacity} swr={parseInt(item.swr) > 0} win={parseInt(item.win) > 0} wc={parseInt(item.wc) > 0} title={Platform.OS == 'ios' ? (item.title.replace(/<[^>]*>?/gm, '')).replaceAll('\n', '').replaceAll('  ', '') : item.title} bed={item.bed} key={index + ' qsdqs 55'} />
                    })
                }
            </BottomModal>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scr_wrp: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    wv: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        marginTop: Constants.statusBarHeight + 60
    },
})
