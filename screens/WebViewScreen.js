import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';

import { WebView } from 'react-native-webview';

import ResultCard from '../components/ResultCard';

import BottomModal from '../components/BottomModal';

import CardItem from '../components/CardItem';

let { width, height } = Dimensions.get('window');

import { useRoute } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

import { useNavigation, useIsFocused } from "@react-navigation/native";

import TopBar from "../components/TopBar";

import { mainEndPoint } from '../api/EndPoint';

import FoodRow from '../components/FoodRow';

import { TabStateContext } from '../context/TabManager';

export default function WebViewScreen() {
    const [results, setResults] = useState([]);

    const { setShowBottomTab } = useContext(TabStateContext)

    const [selectedResult, setSelectedResult] = useState(-1);

    let { params } = useRoute();

    let navigation = useNavigation();

    let [isEmpty, setIsEmpty] = useState(0);

    const [endPoint, setEndPoint] = useState('/');

    const [selectedOptionsRoom, setSelectedOptionsRoom] = useState([]);

    const [selectedOptionsMeal, setSelectedOptionsMeal] = useState([]);

    const [removeContent, setRemoveContent] = useState(false);

    // useEffect(() => {
    //     console.log('--------------- Results --------------------------');
    //     console.log(results);
    //     console.log('--------------- Results --------------------------');
    // }, [results])

    const [showWebView, setShowWebView] = useState(true);

    let isFocused = useIsFocused();

    useEffect(() => {
        setShowBottomTab(false);
    }, [isFocused])

    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.wrpr}>
            <TopBar title="Resultats" onBack={() => navigation.goBack()} />
            <View style={styles.wv}>
                {showWebView && <WebView style={{ paddingTop: 40 }} source={{ uri: mainEndPoint + endPoint }} injectedJavaScript={`
                function selectElement(id, valueToSelect) {    
                    let element = document.getElementById(id);
                    element.value = valueToSelect;
                }

                document.querySelector('#main-header').remove()
                document.querySelector('.row.main-footer-sub').remove()
                document.querySelector('.row.main-footer-sub').remove()
                document.querySelector('#main-footer').remove()
                if(document.querySelector('.text-bouton-recherche')!=null){
                    document.querySelector('.text-bouton-recherche').remove()
                }

                if(${endPoint == '/'} == true || ${endPoint == '/resultats'} == true ){
                    let arro = []

                    let results = document.querySelectorAll('.panel-body.resultat');

                    if(results.length >0){
                        if(document.querySelectorAll('a[role=button]').length>0){
                            document.querySelectorAll('a[role=button]').forEach((it)=>{
                                if(it.className.includes('btn-choisir')){
                                    it.click()
                                }
                            })

                            setTimeout(() => {
                                if(${endPoint == '/resultats'} == true){
                                    let tmp_results = document.querySelectorAll('.panel-body.resultat');
                                    tmp_results.forEach((itemo,index)=>{
                                        let tmpLsto = itemo.nextElementSibling.children[0].querySelector('table>tbody').querySelectorAll('tr')
                                        // let tmp = itemo.querySelector('select')
                                        let arr = ${JSON.stringify(selectedOptionsMeal)}
                                        let arr1 = ${JSON.stringify(selectedOptionsRoom)}
                                        arr[index].forEach((val,ind)=>{
                                            let tmpLst1 = itemo.nextElementSibling.children[0].querySelector('.panel-body.collapse.in').querySelectorAll('input')[ind].value =val
                                        })
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

                                    setTimeout(() => {
                                        if(document.querySelector('#prix_total').children.length>0){
                                            window.ReactNativeWebView.postMessage(JSON.stringify({
                                                type:'price',
                                                price:document.querySelector('#prix_total').innerText
                                            }))
                                        }
                                        Array.from(document.querySelectorAll('.btn.btn-primary.btn-lg')).filter((it)=>it.type == 'submit')[0].click()

                                        // setTimeout(() => {
                                            
                                        // }, 1000);

                                        // setTimeout(() => {
                                        //     document.querySelector('#main-header').remove()
                                        //     document.querySelector('.row.main-footer-sub').remove()
                                        //     document.querySelector('.row.main-footer-sub').remove()
                                        //     document.querySelector('#main-footer').remove()
                                        // }, 1000);
                                    }, 1000);
                                    
                                }
                            },0);
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
                                    // Array.from(trIt.children).forEach((tdIt, index) => {
                                    //     if (index == 0) {
                                    //         tmpDetail.title = tdIt.innerText
                                    //     }
                                    //     if (tdIt.className.includes('r-cache')) {
                                    //         tmpDetail[tmpKeys[index]] = tdIt.children.length
                                    //     }
                    
                                    //     if (trIt.children.length - 2 == index) {
                                    //         tmpDetail.price = tdIt.querySelector('h5').innerText
                                    //         if(!trIt.className.includes('hidden')){
                                    //             let tmp = trIt.querySelector('select')
                                    //             tmpDetail.max=tmp.children[tmp.children.length-1].innerText
                                    //         }
                                    //         tp_det.push(tmpDetail);
                                    //     }
                                    // })
                                    if(!trIt.className.includes('hidden')){
                                        tp_det.push({title:trIt.querySelectorAll('td')[0].innerText,capacity:trIt.querySelectorAll('td')[1].children.length,bed:trIt.querySelectorAll('td')[2].children[0].attributes["data-original-title"].value,win:trIt.querySelectorAll('td')[3].children.length,swr:trIt.querySelectorAll('td')[4].children.length,wc:trIt.querySelectorAll('td')[5].children.length,max:trIt.querySelectorAll('td')[6].children[0].children[trIt.querySelectorAll('td')[6].children[0].children.length-1].innerText,price:trIt.querySelectorAll('td')[7].innerText})
                                    }
                            })
                            
                            let timeData = []
                            item.children[2].querySelectorAll('h5').forEach((it)=>{
                                timeData.push(it.innerText)
                            })

                            obj.time_data = timeData;

                            obj.destinations = item.parentElement.previousElementSibling.previousElementSibling.querySelector('a').innerText
                            obj.details = tp_det
                            let tmpFdSelection = []
                            item.nextElementSibling.children[0].querySelectorAll('.panel-body.collapse.in').forEach((it)=>{
                                it.querySelectorAll('.col-md-8').forEach((itm)=>{
                                    tmpFdSelection.push(itm.innerText)
                                })
                            })

                            obj.food = tmpFdSelection
                            arro.push(obj)
                        })

                        let tmpStuff = {
                            type:'results',
                            data:arro
                        }

                        window.ReactNativeWebView.postMessage(JSON.stringify(tmpStuff));
                    }else if(document.querySelectorAll('.alert-link').length >0){
                        
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type:'error',
                            data:[]
                        }))
                    }


                    selectElement('allee', '${params.dest1}');
                    document.querySelector('#vehicules').value="1 Véhicule";
                    document.querySelector('#date_depart').value='${params.selectedDates[0]}';

                    if (${params.selectedDates.length < 2} == true) {
                        document.querySelectorAll(".radio-inline").forEach((it)=>{
                            it.click()
                        })
                        document.querySelector('input[name=type_traversee]').value= 'ALLEE_SIMPLE';
                    }

                    // if (document.querySelector('.alert-link') != null) {
                    //     JSON.stringify({
                    //         type:'error',
                    //         data:[]
                    //     })
                    //     window.ReactNativeWebView.postMessage("dsqdjksdfjk")
                    // }

                    document.querySelector('#date_retour').value='${params.selectedDates[1]}';
                    document.querySelector('#port_retour').innerHTML="<option value='${params.dest2}'></option>";

                    if(document.querySelector('.btn.btn-traverser.btnheight') != null){
                        document.querySelector('.btn.btn-traverser.btnheight').click();
                    }

                    // let listOfColl = Array.from(document.querySelectorAll('.panel-body.collapse.in')).filter((it)=>it.id.includes('demo'))

                    // let arr = ${JSON.stringify(selectedOptionsMeal)}
                    // let arr1 = ${JSON.stringify(selectedOptionsRoom)}

                    // if(${endPoint == '/resultats'} == true){
                    //     setTimeout(() => {
                    //         document.write(arr)
                    //     }, 8000);
                    // }
                }
                `} onMessage={(event) => {
                        let tmpData = JSON.parse(event.nativeEvent.data)

                        // console.log("----------------TMP DATA-----------------------")
                        // console.log(tmpData.data)
                        // console.log("-------------------TMP DATA--------------------")
                        // setTimeout(() => {
                        //     setEndPoint('/resultats')
                        //     setShowWebView(false)
                        //     setTimeout(() => {
                        //         setShowWebView(true)
                        //     }, 1000);
                        //     console.log('-----------------Timed Out-------------------')
                        // }, 8000)

                        let tmpCounts = []
                        let tmpCounts_o = []

                        if (tmpData && tmpData.type && tmpData.type == 'results' && tmpData.data && tmpData.data.length > 0) {
                            tmpData.data.forEach((item) => {
                                let localCount = []
                                let localCount_o = []

                                console.log(item.food.length)
                                for (let i = 0; i < item.details.length; i++) {
                                    localCount.push(0)
                                }

                                for (let i = 0; i < item.food.length; i++) {
                                    localCount_o.push(0)
                                }

                                tmpCounts_o.push(localCount_o);
                                tmpCounts.push(localCount);
                            })

                            setSelectedOptionsMeal(tmpCounts_o)
                            setSelectedOptionsRoom(tmpCounts)
                        }

                        if (tmpData.type == 'results') {
                            setResults(tmpData.data);
                            setIsEmpty(2)
                        } else if (tmpData.type == 'price') {
                            setTimeout(() => {
                                setRemoveContent(true)
                            }, 1000);
                        } else {
                            console.log('-----------------Timed Out-------------------')
                            console.log(tmpData)

                            setIsEmpty(1)
                        }
                    }} />}
            </View>

            {!removeContent && <View style={{ backgroundColor: '#414780', height: '100%', flex: 1, position: 'relative', bottom: 0 }}>
                {isEmpty == 2 && results.length > 0 && <ScrollView style={styles.scr_wrp}>
                    {
                        results.map((item, index) => {
                            return (
                                <ResultCard onMore={() => setSelectedResult(index)} fullDate={`${item.date.split('\n')[0]} ${item.date.split('\n')[1]} ${item.date.split('\n')[2]}`} key={index + ' rc'} fromCountry='MAR' toCountry='FRA' from={item.destinations.split(' ')[0]} code={item.code_voyage} departureHour={item.time_data[1].split('\n')[0]} arrivalHour={item.time_data[2].split('\n')[0]} duration={item.other[0]} to={item.destinations.split(' ')[2]} uri={item.img} />
                            )
                        })
                    }
                </ScrollView>}
                {isEmpty == 1 && <View style={[styles.scr_wrp, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
                    <Text style={{ color: 'white', fontFamily: 'Gilroy-Medium' }}>
                        Aucun Voyage n'est trouvé
                    </Text>
                </View>}

                {results.length > 0 && selectedOptionsRoom.length > 0 && selectedResult > -1 && <BottomModal bottom={0} onPress={() => setSelectedResult(-1)}>
                    {
                        results[selectedResult].details.map((item, index) => {

                            return <CardItem onChange={(value) => {
                                // console.log(selectedOptionsRoom)
                                if (value <= parseInt(item.max) && value >= 0) {
                                    let tmpSel = [...selectedOptionsRoom]
                                    tmpSel[selectedResult][index] = value
                                    setSelectedOptionsRoom(tmpSel)
                                }
                            }} value={selectedOptionsRoom[selectedResult][index]} price={item.price} capacity={item.capacity} swr={parseInt(item.swr) > 0} win={parseInt(item.win) > 0} wc={parseInt(item.wc) > 0} title={item.title} bed={item.bed} key={index + ' qsdqs 55'} />
                        })
                    }
                    {
                        results[selectedResult].food.map((item, index) => {
                            // console.log("---------Item---------")
                            // console.log(item)

                            return (
                                <FoodRow key={index + 'fd row'} value={selectedOptionsMeal[selectedResult][index]} onChange={(value) => {
                                    let tmpSelMe = [...selectedOptionsMeal]
                                    tmpSelMe[selectedResult][index] = value
                                    setSelectedOptionsMeal(tmpSelMe)
                                }} title={item} />
                            )
                        })
                    }
                </BottomModal>}
            </View>}
            {isEmpty == 0 && <View style={styles.ldr_wrpr}>
                <View style={styles.ldr_cntnt}>
                    <ActivityIndicator color='black' size={26} />
                </View>
            </View>}
            {!(selectedResult > -1) && isEmpty != 0 && !removeContent && <TouchableOpacity onPress={() => {
                setEndPoint('/resultats')
                setShowWebView(false)
                setTimeout(() => {
                    setShowWebView(true)
                }, 0);

                setLoading(true);
            }} style={styles.submitBtn}>
                {!loading ? <Ionicons name="arrow-forward" size={24} color="black" /> : <ActivityIndicator color='black' size={24} />}
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrpr: {
        paddingTop: Constants.statusBarHeight,
        position: 'relative',
        backgroundColor: '#089082',
        flex: 1
    },
    wv: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0,
        marginTop: Constants.statusBarHeight + 60
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
        justifyContent: 'center',
        bottom: 0
    },
    ldr_cntnt: {
        backgroundColor: 'white',
        height: 150,
        width: 150,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitBtn: {
        position: 'absolute',
        bottom: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,
        // elevation: 7,
    }
})