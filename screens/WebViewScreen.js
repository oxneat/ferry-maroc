import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

import Constants from 'expo-constants';

import { WebView } from 'react-native-webview';

import ResultCard from '../components/ResultCard';

import BottomModal from '../components/BottomModal';

import CardItem from '../components/CardItem';

let { width, height } = Dimensions.get('window');

import { useRoute } from '@react-navigation/native';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

import { useNavigation } from "@react-navigation/native";

import TopBar from "../components/TopBar";

export default function WebViewScreen() {
    const [results, setResults] = useState([]);

    const [selectedResult, setSelectedResult] = useState(-1);

    let { params } = useRoute();

    let navigation = useNavigation();

    useEffect(() => {
        console.log('--------------- Results --------------------------');
        console.log(results);
        console.log('--------------- Results --------------------------');
    }, [results])

    useEffect(() => {
        setTimeout(() => {
            setResults([0])
        }, getRandomIntInclusive(2000, 15000))
    }, [])

    return (
        <View style={styles.wrpr}>
            <TopBar title="Resultats" onBack={() => navigation.goBack()} />
            {/* <View style={styles.wv}>
                <WebView source={{ uri: 'https://www.maroc-ferry.com/', }} injectedJavaScript={`
                function selectElement(id, valueToSelect) {    
                    let element = document.getElementById(id);
                    element.value = valueToSelect;
                }
                let arro = []

                let results = document.querySelectorAll('.panel-body.resultat');

                if(results.length >0){
                    if(document.querySelectorAll('a[role=button]').length>0){
                        document.querySelectorAll('a[role=button]').forEach((it)=>{
                            if(it.className.includes('btn-choisir')){
                                it.click()
                            }
                        })
                    }
                    results.forEach((item)=>{
                        let obj = {}
                        for(let i=0;i<4;i++){
                            let itms = item.children[i]
        
                            if (i == 1) {
                                obj.img = itms.children[0].src
                            }else if(i == 0){
                                obj.date = itms.children[1].innerText
                            }else if(i == 2){
                                Array.from(itms.children[1].children).forEach((it,ind)=>{
                                    if(ind > 0){
                                        obj[it.className]= it.value;
                                    }
                                })
        
                                let other =itms.children[2].innerText.split(' ').filter(it=>it.length>1)
                                obj.other = other
                            }
                        }


                        
                        let tmpLst = item.nextElementSibling.children[0].querySelector('table>tbody').querySelectorAll('tr')
                        let tmpKeys = Array.from(item.nextElementSibling.children[0].querySelector('table>thead>tr').children).map((itemo) => itemo.innerText)
                        let tp_det = []
                        Array.from(tmpLst).forEach(trIt => {
                            let tmpDetail = {}
                            Array.from(trIt.children).forEach((tdIt, index) => {
                                if (index == 0) {
                                    tmpDetail.title = tdIt.innerText
                                }
                                if (tdIt.className.includes('r-cache')) {
                                    tmpDetail[tmpKeys[index]] = tdIt.children.length
                                }
            
                                if (trIt.children.length - 2 == index) {
                                    tmpDetail.price = tdIt.querySelector('h5').innerText
                                    tp_det.push(tmpDetail);
                                }
                            })
                        })
                        
                        let timeData = []
                        item.children[2].querySelectorAll('h5').forEach((it)=>{
                            timeData.push(it.innerText)
                        })

                        obj.time_data = timeData;

                        obj.destinations = item.parentElement.previousElementSibling.previousElementSibling.querySelector('a').innerText
                        obj.details = tp_det
                        arro.push(obj)
                    })

                    window.ReactNativeWebView.postMessage(JSON.stringify(arro));
                }


                selectElement('allee', '${params.dest1}');
                document.querySelector('#vehicules').value="1 Véhicule";
                document.querySelector('#date_depart').value='${params.selectedDates[0]}';
                if (${params.selectedDates.length == 0} == true) {
                    document.querySelectorAll(".radio-inline").forEach((it)=>{
                        it.click()
                    })
                }else{
                    document.querySelector('#date_retour').value='${params.selectedDates[1]}';
                    document.querySelector('#port_retour').innerHTML="<option value='${params.dest2}'></option>";
                }

                document.querySelector('.btn.btn-traverser.btnheight').click();
                `} onMessage={(event) => {
                        let tmpData = JSON.parse(event.nativeEvent.data)
                        if (tmpData.length > 0) {
                            setResults(tmpData);
                        }
                    }} />
            </View> */}
            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#414780', bottom: 0 }}>
                {/* <ScrollView style={styles.scr_wrp}>
                    {
                        results.map((item, index) => {


                            return (
                                <ResultCard onMore={() => setSelectedResult(index)} fullDate={`${item.date.split('\n')[0]} ${item.date.split('\n')[1]} ${item.date.split('\n')[2]}`} key={index + ' rc'} fromCountry='MAR' toCountry='FRA' from={item.destinations.split(' ')[0]} code={item.code_voyage} departureHour={item.time_data[1].split('\n')[0]} arrivalHour={item.time_data[2].split('\n')[0]} duration={item.other[0]} to={item.destinations.split(' ')[2]} uri={item.img} />
                            )
                        })
                    }
                </ScrollView> */}
                {results.length > 0 && <View style={[styles.scr_wrp, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
                    <Text style={{ color: 'white', fontFamily: 'Gilroy-Medium' }}>
                        Aucun Voyage n'est trouvé
                    </Text>
                </View>}

                {results.length > 0 && selectedResult > -1 && <BottomModal onPress={() => setSelectedResult(-1)}>
                    {
                        results[selectedResult].details.map((item, index) => {

                            return <CardItem price={item.price} title={item.title} key={index + ' qsdqs 55'} />
                        })
                    }
                </BottomModal>}
                {results.length == 0 && <View style={styles.ldr_wrpr}>
                    <View style={styles.ldr_cntnt}>
                        <ActivityIndicator color='black' size={26} />
                    </View>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrpr: {
        paddingTop: Constants.statusBarHeight,
        position: 'relative',
        backgroundColor: '#089082',
        height: '100%'
    },
    wv: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        marginTop: Constants.statusBarHeight
    },
    scr_wrp: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    ldr_wrpr: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ldr_cntnt: {
        backgroundColor: 'white',
        height: 150,
        width: 150,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})