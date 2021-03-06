import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, Platform, Alert } from 'react-native';

import Constants from 'expo-constants';

import { WebView } from 'react-native-webview';

import ResultCard from '../components/ResultCard';

import BottomModal from '../components/BottomModal';

import CardItem from '../components/CardItem';

let { width, height } = Dimensions.get('window');

import { useRoute } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { isSmall, isBig } from '../helpers/Dimension';

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

import { AlertContext } from '../context/AlertManager';

import Colors from '../helpers/Colors';

export default function WebViewScreen() {
    const [results, setResults] = useState([]);

    const { setShowBottomTab } = useContext(TabStateContext)

    const { setAlert } = useContext(AlertContext);

    const [selectedResult, setSelectedResult] = useState(-1);

    let { params } = useRoute();

    let navigation = useNavigation();

    let [isEmpty, setIsEmpty] = useState(0);

    const [endPoint, setEndPoint] = useState('/');

    const [selectedOptionsRoom, setSelectedOptionsRoom] = useState([]);

    const [selectedOptionsMeal, setSelectedOptionsMeal] = useState([]);

    const [removeContent, setRemoveContent] = useState(false);

    const [Total, setTotal] = useState([0, 0]);

    // useEffect(() => {
    //     console.log('--------------- params --------------------------');
    //     console.log();
    //     console.log('--------------- params --------------------------');
    // }, [params])

    const [showWebView, setShowWebView] = useState(true);

    let isFocused = useIsFocused();

    useEffect(() => {
        setShowBottomTab(false);
    }, [isFocused])

    const [loading, setLoading] = useState(false);

    const [titleHd, setTitleHd] = useState('Resultats');

    const [pricePopUp, setPricePopUp] = useState('');

    // useEffect(() => {
    //     console.log("--------------Total--------------")
    //     console.log(Total)
    //     console.log("--------------Total--------------")
    // }, [Total])

    return (
        <View style={styles.wrpr}>
            <TopBar title={titleHd} onBack={() => {
                if (titleHd == 'Confirmation & paiement') {
                    Alert.alert('', "Souhaitez-vous abandonner cette r??servation ?", [{
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
                {showWebView && <WebView style={{ paddingTop: 40 }} source={{ uri: mainEndPoint + endPoint }} injectedJavaScript={`
                function selectElement(id, valueToSelect) {    
                    let element = document.getElementById(id);
                    element.value = valueToSelect;
                }

                if(document.querySelector('#detailsRes') != null){
                    Array.from(document.querySelector('#detailsRes').children).forEach((it,ind)=>{
                        if(ind>1){
                            it.remove()
                        }
                    })

                    document.querySelector('#detailsRes').nextElementSibling.remove()

                    document.querySelector('#detailsRes').nextElementSibling.remove()

                    document.querySelector('#recevoirDevis').remove()
                }

                // if (document.querySelector('.backToBoutiqueButton') != null {
                //     document.querySelector('.backToBoutiqueButton').addEventListener('click',()=>{
                //         document.querySelector('.backToBoutiqueButton').addEventListener('click',()=>{
                //             window.ReactNativeWebView.postMessage(JSON.stringify({
                //                 type:'back',
                //             }))
                //         })
                //     })    
                // }
                

                document.querySelector('#main-header').remove()
                document.querySelector('.row.main-footer-sub').remove()
                document.querySelector('.row.main-footer-sub').remove()
                document.querySelector('#main-footer').remove()
                if(document.querySelector('.text-bouton-recherche')!=null){
                    document.querySelector('.text-bouton-recherche').remove()
                }

                if (document.querySelector(".row.breadcrumb") != null) {
                    document.querySelector(".row.breadcrumb").remove()
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
                                                price:${Platform.OS == 'ios'} == true ? document.querySelector('#prix_total').innerHTML : document.querySelector('#prix_total').innerText
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
                                    if(!trIt.className.includes('hidden')){
                                        tp_det.push({title:${Platform.OS == 'ios'} == true ? trIt.querySelectorAll('td')[0].innerHTML: trIt.querySelectorAll('td')[0].innerText,capacity:trIt.querySelectorAll('td')[1].children.length,bed:trIt.querySelectorAll('td')[2].children[0].attributes["data-original-title"].value,win:trIt.querySelectorAll('td')[3].children.length,swr:trIt.querySelectorAll('td')[4].children.length,wc:trIt.querySelectorAll('td')[5].children.length,max:trIt.querySelectorAll('td')[6].children[0].children[trIt.querySelectorAll('td')[6].children[0].children.length-1].innerText,price: ${Platform.OS == 'ios'} == true ? trIt.querySelectorAll('td')[7].innerHTML : trIt.querySelectorAll('td')[7].innerText})
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
                                    tmpFdSelection.push(${Platform.OS == 'ios'} == true ? itm.innerHTML :itm.innerText )
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

                    let frm = document.querySelector('#recherche_moteur').querySelectorAll('input')
                    if (frm.legth > 0) {
                        let obj_rand = ${JSON.stringify(params.obj_ve_pass)}
                        
                        Array.from(frm).filter((it)=>it.name.includes('nb')).forEach((it)=>{
                            it.value = obj_rand[it.id]
                        })
                    }

                    selectElement('allee', '${params.dest1}');
                    document.querySelector('#passag').value='${params.passengers}';
                    document.querySelector('#vehicules').value='${params.vehicles}';
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
                            // setPricePopUp(tmpData.price)

                            // setIsEmpty(0)


                            setTimeout(() => {
                                setRemoveContent(true)
                                setTitleHd('Confirmation & paiement')
                            }, 1000);

                            setTimeout(() => {
                                setIsEmpty(1)
                            }, 5000);
                        }
                        else if (tmpData.type == 'back') {
                            navigation.goBack();
                        } else {
                            console.log('-----------------Timed Out-------------------')
                            console.log(tmpData)

                            setIsEmpty(1)
                        }
                    }} />}
            </View>

            {/* {!removeContent && <View style={{ backgroundColor: '#414780', height: '100%', flex: 1, position: 'relative', bottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ fontFamily: 'Gilroy-Heavy', color: Colors.main, fontSize: 20 }}>
                        Prix Total :
                    </Text>
                    <Text style={{ fontFamily: 'Gilroy-Bold', color: 'white', fontSize: 18 }}>
                        {(Total[0] + Total[1]).toFixed(2)} Eur
                    </Text>

                </View>
                {isEmpty == 2 && results.length > 0 && <ScrollView style={[styles.scr_wrp, { paddingTop: 0 }]}>
                    {
                        results.map((item, index) => {
                            return (
                                <ResultCard total={Total[index]} onMore={() => {
                                    setSelectedResult(index)
                                    console.log(item)
                                }} fullDate={`${item.date.split('\n')[0]} ${item.date.split('\n')[1]} ${item.date.split('\n')[2]}`} key={index + ' rc'} fromCountry='MAR' toCountry='FRA' from={item.destinations.split(' ')[0]} code={item.code_voyage} departureHour={item.time_data[1].split('\n')[0]} arrivalHour={item.time_data[2].split('\n')[0]} duration={item.other[0]} to={item.destinations.split(' ')[2]} uri={item.img} />
                            )
                        })
                    }
                </ScrollView>}
                {isEmpty == 1 && <View style={[styles.scr_wrp, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
                    <Text style={{ color: 'white', fontFamily: 'Gilroy-Medium' }}>
                        Aucune travers??e ?? cette date
                    </Text>
                </View>}

                {results.length > 0 && selectedOptionsRoom.length > 0 && selectedResult > -1 && <BottomModal secBtn onPresso={() => setSelectedResult(-1)} bottom={0} onPress={() => setSelectedResult(-1)}>
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

                                console.log('-------------- valType --------------------')
                                console.log(valType)
                                console.log('-------------- valType --------------------')

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
                                    setAlert({ type: 'err', msg: `Le nombre d'accommodation choisi pour ${typeTr} est sup??rieur au nombre de passagers` })
                                    setTimeout(() => {
                                        setAlert({ type: '', msg: '' })
                                    }, 5000);
                                }

                            }} value={selectedOptionsRoom[selectedResult][index]} price={Platform.OS == 'ios' ? item.price.replace(/<[^>]*>?/gm, '').replaceAll('\n', '').replaceAll('  ', '') : item.price} capacity={item.capacity} swr={parseInt(item.swr) > 0} win={parseInt(item.win) > 0} wc={parseInt(item.wc) > 0} title={Platform.OS == 'ios' ? (item.title.replace(/<[^>]*>?/gm, '')).replaceAll('\n', '').replaceAll('  ', '') : item.title} bed={item.bed} key={index + ' qsdqs 55'} />
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
                <View style={[styles.ldr_cntnt, pricePopUp.length > 0 && isEmpty == 0 ? { width: '80%' } : {}]}>
                    <ActivityIndicator color='black' size={26} />
                </View>
            </View>}
            {!(selectedResult > -1) && isEmpty != 0 && !removeContent && isEmpty != 1 && <TouchableOpacity onPress={() => {

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
                    setEndPoint('/resultats')
                    setShowWebView(false)
                    setTimeout(() => {
                        setShowWebView(true)
                    }, 0);

                    setLoading(true);
                } else {
                    setAlert({ type: 'warn', msg: 'Toutes les options ne sont pas selectionn??es' })
                    setTimeout(() => {
                        setAlert({ type: '', msg: '' })
                    }, 5000);
                }
            }} style={styles.submitBtn}>
                <Text style={{ fontFamily: 'Gilroy-Bold', marginRight: 10 }}>Continuer</Text>
                {!loading ? <Ionicons name="arrow-forward" size={24} color="black" /> : <ActivityIndicator color='black' size={24} />}
            </TouchableOpacity>} */}
        </View>
    )
}

const styles = StyleSheet.create({
    wrpr: {
        paddingTop: Constants.statusBarHeight,
        position: 'relative',
        // backgroundColor: '#089082',
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
    }
})