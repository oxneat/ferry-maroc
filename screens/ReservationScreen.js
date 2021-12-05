import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';

import Calendar from '../components/Calendar';

// import SelectionControls from '../components/SelectionControls';

import PassengersRow from '../components/PassengersRow';

import { getIds } from '../api/GetDestinations';

import { getTravRet } from '../api/ReservationRequests';

import BottomModal from '../components/BottomModal';

// import dayjs from 'dayjs';

import { useRoute } from "@react-navigation/native";

import SelectionControls from '../components/SelectionControls';
import { TabStateContext } from '../context/TabManager';

import Colors from '../helpers/Colors';

import Constants from 'expo-constants';

import { AlertContext } from '../context/AlertManager';

import { isBig } from '../helpers/Dimension';

let imgs = ['https://www.ferrymaroc.com/easybook/images/bg/gnv.webp', 'https://www.ferrymaroc.com/easybook/images/bg/13.webp', 'https://www.ferrymaroc.com/easybook/images/bg/4.jpg']

function arrayCompare(_arr1, _arr2) {
    if (
        !Array.isArray(_arr1)
        || !Array.isArray(_arr2)
        || _arr1.length !== _arr2.length
    ) {
        return false;
    }

    // .concat() to not mutate arguments
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

let arr = [['Voiture', 'car-alt', 'Véhicules', 'Véhicule', 'nb_voitures'], ['Remorque', 'caravan', 'remorques', 'remorque', 'nb_remorques'], ['Fourgon', 'shuttle-van', 'fourgons', 'fourgon', 'nb_fourgons'], ['Motocyclette', 'motorcycle', 'Motocyclette', 'moto', 'nb_motos']];
// car-alt motorcycle shuttle - van caravan

export default function ReservationScreen() {
    const [showDatePicker, setShowDatePicker] = useState(-1);

    const [showDestDialog, setShowDestDialog] = useState(false);

    const [page, setPage] = useState(0);

    const [destinations, setDestinations] = useState([]);

    const [selectedDest, setSelectedDest] = useState([-1, -1]);

    const [selectedDest1, setSelectedDest1] = useState([-1, -1]);

    const [selectedTab, setSelectedTab] = useState(-1);

    const [vehicles, setVehicles] = useState([]);

    const [agesConstraints, setAgesConstraints] = useState();

    const [showAgePicker, setShowAgePicker] = useState(false);

    const [datesAvailable, setDatesAvailable] = useState([]);

    const [selectedDates, setSelectedDates] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedPeople, setSelectedPeople] = useState([1, 0, 0, 0, 0]);

    const [selectedVehi, setSelectedVehi] = useState([]);

    const isFocused = useIsFocused();

    let { showBottomTab, setShowBottomTab } = useContext(TabStateContext)

    const { setAlert } = useContext(AlertContext);

    // const [selectedVehicles, setSelectedVehicles] = useState([])

    // const [dateType, setDateType] = useState(0);

    useEffect(() => {
        getIds().then(res => {

            // res.splice(0, 1);
            // console.log(res)
            setDestinations(res);
        })
    }, [])

    let navigation = useNavigation();

    let { params } = useRoute();

    useEffect(() => {
        setTimeout(() => {
            let curr = page
            if (page < imgs.length - 1) {
                curr += 1
            } else {
                curr = 0
            }

            if (curr != page) {
                setPage(curr)
            }

        }, 5000)
    }, [page])

    useEffect(() => {
        if (params && params.selectedDates) {
            setSelectedDates(params.selectedDates)
        }

    }, [params])

    useEffect(() => {

        let itemos = {}

        for (let i = 0; i < arr.length; i++) {
            vehicles.forEach((vh, index) => {
                if (vh.type_vehicule == arr[i][0]) {
                    if (itemos[i]) {
                        itemos[i] = [...itemos[i], 0]
                    } else {
                        itemos[i] = [0]
                    }
                }
            })
        }

        setSelectedVehi(Object.keys(itemos).map((item) => itemos[item]));
    }, [vehicles])

    useEffect(() => {
        if (selectedDest[0] != -1 && selectedDest[1] != -1) {
            let tmpStr = destinations[selectedDest[0]].data[selectedDest[1]][1];

            tmpStr = [...tmpStr.split(" ")[0].split("-"), tmpStr.split(" ")[1]]

            destinations.forEach((ele, ind) => {
                ele.data.forEach((eled, indo) => {
                    let tmpstr1 = [...eled[1].split(" ")[0].split("-"), eled[1].split(" ")[1]]
                    if (arrayCompare(tmpStr, tmpstr1)) {
                        if (!(selectedDest[0] == ind && selectedDest[1] == indo)) {
                            setSelectedDest1([ind, indo])
                        }
                    }

                })
            })
        }

    }, [selectedDest])


    useEffect(() => {
        if (isFocused && !showBottomTab) {
            setShowBottomTab(true)
        }
    }, [isFocused])

    let [selectedBtn, setSelectedBtn] = useState(0)

    // console.log(arr)

    return (
        <View style={styles.container} >
            <ImageBackground source={{ uri: imgs[page] }} style={[styles.fi_sc, { height: isBig ? 400 : 'auto' }]} >
                <View style={{ position: 'absolute', width: '1000%', height: '1000%', backgroundColor: 'rgba(0,0,0,0.3)', flex: 1 }} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                    <View style={{ ...styles.rw, alignItems: 'flex-end' }} >
                        <AntDesign name="star" size={12 * (isBig ? 2 : 1)} color="#e3e3e3" />
                        <AntDesign name="star" size={15 * (isBig ? 2 : 1)} color="#ff9300" />
                        <AntDesign name="star" size={12 * (isBig ? 2 : 1)} color="#e3e3e3" />
                    </View>
                    <Image resizeMode='contain' style={{ width: 220 * (isBig ? 2 : 1), height: 50 * (isBig ? 2 : 1) }} source={require('../assets/images/logo.png')} />
                </View>
                {/* <Text style={{ fontFamily: 'Gilroy-Heavy', fontSize: 30, marginBottom: 30, ...styles.white, textAlign: 'center' }} >
                    Réservez votre voyage
                </Text> */}
                <View style={[styles.rw, { alignSelf: 'center', marginTop: isBig ? 20 : 0 }]} >
                    <TouchableOpacity onPress={() => {
                        if (selectedBtn != 0) {
                            setSelectedDates([])
                        }

                        setSelectedBtn(0)
                    }} style={selectedBtn == 0 ? { ...styles.selectedBtn, marginRight: 30 } : {}} >
                        <Text style={{ fontFamily: 'Gilroy-Bold', ...styles.white, ...styles.resp_txt }} >
                            Aller et Retour
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        let tmpSel = [...selectedDates]
                        if (selectedDates.length == 2) {
                            tmpSel = [selectedDates[0]]
                        }
                        setSelectedDates(tmpSel)
                        setSelectedBtn(1)
                    }} style={selectedBtn == 1 ? { ...styles.selectedBtn, marginLeft: 30 } : {}}>
                        <Text style={{ fontFamily: 'Gilroy-Bold', color: '#fff', ...styles.resp_txt }} >
                            Aller Simple
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ padding: 20 }} >
                <Text style={{ fontFamily: 'Gilroy-Bold', marginBottom: 5 }} >
                    Origine/Destination
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#c7c7c7', borderRadius: 10 }} >
                    <TouchableOpacity onPress={() => setShowDestDialog(true)} style={{ ...styles.rw, padding: 10 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', borderRightColor: '#c7c7c7', borderRightWidth: 1, paddingRight: 10, marginRight: 10 }} >
                            <MaterialCommunityIcons style={{ transform: [{ rotateY: '180deg' }] }} name="sail-boat" size={25} color="#c7c7c7" />
                        </View>
                        <View style={{ ...styles.rw, justifyContent: 'space-between', flex: 1 }} >
                            <Text style={{ fontFamily: selectedDest[0] != -1 && selectedDest[1] != -1 ? "Gilroy-Bold" : 'Gilroy-Thin', color: selectedDest[0] != -1 && selectedDest[1] != -1 ? 'black' : 'gray', textTransform: 'capitalize', fontSize: selectedDest[0] != -1 && selectedDest[1] != -1 ? 18 : 20 }} >
                                {selectedDest[0] != -1 && selectedDest[1] != -1 ? destinations[selectedDest[0]].data[selectedDest[1]][1] : "Sélectionnez"}
                            </Text>
                            <Text style={{ fontFamily: 'Gilroy-Bold', textTransform: 'capitalize', fontSize: 13 }} >
                                Aller
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {selectedBtn == 0 && <View style={{ ...styles.rw, padding: 10, borderTopWidth: 1, borderTopColor: '#c7c7c7' }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', borderRightColor: '#c7c7c7', borderRightWidth: 1, paddingRight: 10, marginRight: 10 }} >
                            <MaterialCommunityIcons name="sail-boat" size={25} color="#c7c7c7" />
                        </View>
                        <View style={{ ...styles.rw, justifyContent: 'space-between', flex: 1 }} >
                            <Text style={{ fontFamily: selectedDest1[0] != -1 && selectedDest1[1] != -1 ? 'Gilroy-Bold' : 'Gilroy-Thin', color: selectedDest1[0] != -1 && selectedDest1[1] != -1 ? 'black' : 'gray', textTransform: 'capitalize', fontSize: selectedDest1[0] != -1 && selectedDest1[1] != -1 ? 18 : 20 }} >
                                {selectedDest1[0] != -1 && selectedDest1[1] != -1 ? destinations[selectedDest1[0]].data[selectedDest1[1]][1] : "Sélectionnez"}
                            </Text>
                            <Text style={{ fontFamily: 'Gilroy-Bold', textTransform: 'capitalize', fontSize: 13 }} >
                                Retour
                            </Text>
                        </View>
                    </View>}
                </View>
                <View style={{ ...styles.rw, marginTop: 10 }} >
                    <View style={{ flex: 1 }} >
                        <Text style={{ fontFamily: 'Gilroy-Bold', marginBottom: 5 }} >
                            Départ
                        </Text>
                        <TouchableOpacity onPress={() => {
                            if (agesConstraints) {
                                navigation.navigate('calendar', { dates: datesAvailable["aller"], type: 'go', selected: selectedDates })
                            }
                        }} style={{ borderWidth: 1, borderColor: '#c7c7c7', borderRadius: 10, ...styles.rw, padding: 10 }} >
                            <AntDesign size={20} style={{ marginRight: 10 }} color="gray" name="calendar" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold' }} >
                                {
                                    selectedDates.length < 1 ? 'Ajouter un aller' : selectedDates[0]
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {selectedBtn == 0 && <View style={{ flex: 1, marginLeft: 10 }} >
                        <Text style={{ fontFamily: 'Gilroy-Bold', marginBottom: 5 }} >
                            Retour
                        </Text>
                        <TouchableOpacity disabled={selectedDates.length === 0} onPress={() => {
                            if (agesConstraints) {
                                navigation.navigate('calendar', { dates: datesAvailable["retour"], type: 'come', selected: selectedDates })
                            }
                        }} style={{ borderWidth: 1, borderColor: '#c7c7c7', borderRadius: 10, ...styles.rw, padding: 10 }} >
                            <AntDesign size={20} style={{ marginRight: 10 }} color="black" name="calendar" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', color: 'black' }} >
                                {
                                    selectedDates.length < 2 ? 'Ajouter un retour' : selectedDates[1]
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                <View style={{ marginTop: 20 }} >
                    <Text style={{ fontFamily: 'Gilroy-Bold', marginBottom: 5 }} >
                        Passagers
                    </Text>
                    <TouchableOpacity onPress={() => {
                        if (agesConstraints) {
                            setShowAgePicker(true)
                        }
                    }} style={{ borderWidth: 1, borderColor: '#c7c7c7', borderRadius: 10, ...styles.rw, padding: 10, justifyContent: 'space-around' }} >
                        <View style={styles.rw} >
                            <Entypo name="man" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedPeople[0]}
                            </Text>
                        </View>
                        <View style={styles.rw} >
                            <FontAwesome5 name="baby" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedPeople[1]}
                            </Text>
                        </View>
                        <View style={styles.rw} >
                            <FontAwesome name="child" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedPeople[2]}
                            </Text>
                        </View>
                        <View style={styles.rw} >
                            <FontAwesome5 name="dog" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedPeople[3]}
                            </Text>
                        </View>
                        <View style={styles.rw} >
                            <FontAwesome5 name="cat" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedPeople[4]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }} >
                    <Text style={{ fontFamily: 'Gilroy-Bold', marginBottom: 5 }} >
                        Véhicules
                    </Text>
                    <TouchableOpacity onPress={() => {
                        if (agesConstraints) {
                            setSelectedTab(0)
                        }
                    }} style={{ borderWidth: 1, borderColor: '#c7c7c7', borderRadius: 10, ...styles.rw, padding: 10, justifyContent: 'space-around' }} >
                        {
                            arr.map((item, index) => {
                                let sum = 0

                                if (selectedVehi.length > 0) {
                                    selectedVehi[index].forEach((it) => {
                                        sum += it
                                    })
                                }

                                return (
                                    <View key={index + ' pol'} style={styles.rw} >
                                        <FontAwesome5 name={item[1]} size={24} color="gray" />
                                        <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                            {sum}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                        {/* <View style={styles.rw} >
                            <FontAwesome5 name="motorcycle" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedVehi.length === 0 ? 0 : selectedVehi[0].}
                            </Text>
                        </View>
                        <View style={styles.rw} >
                            <FontAwesome5 name="shuttle-van" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedVehi.length === 0 ? 0 : selectedVehi[0].}
                            </Text>
                        </View>
                        <View style={styles.rw} >
                            <FontAwesome5 name="caravan" size={24} color="gray" />
                            <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 10, color: 'gray' }} >
                                {selectedVehi.length === 0 ? 0 : selectedVehi[0].}
                            </Text>
                        </View> */}
                    </TouchableOpacity>
                </View>

            </View>

            {showDatePicker != -1 && <BottomModal onPress={() => setShowDatePicker(-1)} >
                <Calendar selectedDate={selectedDates[0]} onPress={(value) => {
                    let tmpSel = [...selectedDates]
                    // tmpSel[showDatePicker === 0 ? 0 : 1] = value
                    // setSelectedDates(tmpSel);
                    tmpSel[showDatePicker] = value;
                    setSelectedDates(tmpSel)
                    setShowDatePicker(-1)
                }} type={showDatePicker === 0 ? "aller" : "retour"} arr={datesAvailable[showDatePicker === 0 ? "aller" : "retour"]} />
            </BottomModal>}


            {showAgePicker && <BottomModal secBtn onPresso={() => setShowAgePicker(false)} onPress={() => { setShowAgePicker(false) }} >
                <PassengersRow value={selectedPeople[0]} onChange={(val) => {
                    if (val > 0) {
                        let tmp = [...selectedPeople]
                        tmp[0] = val
                        setSelectedPeople(tmp)
                    }
                }} subTit={`(>=${agesConstraints.Age_max} ans)`} icon='ent' name="man" title="Adultes" />
                <PassengersRow value={selectedPeople[1]} onChange={(val) => {
                    if (val >= 0) {
                        let tmp = [...selectedPeople]
                        tmp[1] = val
                        setSelectedPeople(tmp)
                    }
                }} subTit={`(<${agesConstraints.Age_min} ans)`} name='baby' title="Bébé(s)" />
                <PassengersRow value={selectedPeople[2]} onChange={(val) => {
                    if (val >= 0) {
                        let tmp = [...selectedPeople]
                        tmp[2] = val
                        setSelectedPeople(tmp)
                    }
                }} subTit={`(${agesConstraints.Age_min}-${agesConstraints.Age_max} ans)`} name="child" title="Enfants" />
                <PassengersRow value={selectedPeople[3]} onChange={(val) => {
                    if (val >= 0) {
                        let tmp = [...selectedPeople]
                        tmp[3] = val
                        setSelectedPeople(tmp)
                    }
                }} name="dog" title="Chiens" />
                <PassengersRow value={selectedPeople[4]} onChange={(val) => {
                    if (val >= 0) {
                        let tmp = [...selectedPeople]
                        tmp[4] = val
                        setSelectedPeople(tmp)
                    }
                }} name="cat" title="Chats" />
            </BottomModal>}

            {showDestDialog && <BottomModal onPress={() => setShowDestDialog(false)}>
                {
                    destinations.map((destination, indo) => {
                        return (
                            <View key={indo + " col"} >
                                <Text style={{ fontFamily: 'Gilroy-Bold', color: 'gray' }} >
                                    {
                                        destination.title
                                    }
                                </Text>
                                {
                                    destination.data.map((dest, index) => {
                                        return (
                                            <TouchableOpacity key={index + "co col"} onPress={() => {
                                                setSelectedDest([indo, index]);
                                                setShowDestDialog(false);
                                                getTravRet(destinations[indo].data[index][0]).then((response) => {
                                                    // console.log('------------------------ Dates ---------------------')
                                                    // console.log(response.dates)
                                                    // console.log('---------------------------------------------')
                                                    setDatesAvailable(response.dates);
                                                    setAgesConstraints(response.ageConstraints);
                                                    setVehicles(response.vehicles);
                                                })

                                                setSelectedDates([])
                                                setSelectedPeople([1, 0, 0, 0, 0])
                                            }} style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                                <Text style={{ fontFamily: 'Gilroy-Bold' }}>
                                                    {
                                                        dest[1]
                                                    }
                                                </Text>

                                                <View style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: '#e8e8e8', alignItems: 'center', justifyContent: 'center' }} >
                                                    {selectedDest[1] == index && selectedDest[0] == indo && <Entypo name="check" size={10} color="black" />}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }

            </BottomModal>}

            {selectedTab != -1 &&
                <BottomModal secBtn onPresso={() => setSelectedTab(-1)} onPress={() => setSelectedTab(-1)} >
                    <View style={{ flexDirection: 'row', alignSelf: 'center', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#cccccc', marginBottom: 20 }} >
                        {
                            arr.map((it, index) => (
                                <TouchableOpacity onPress={() => setSelectedTab(index)} key={index + ' it'} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 5, borderRadius: 20, marginHorizontal: selectedTab === index ? 10 : 0 }} >
                                    <FontAwesome5 name={it[1]} size={18} color={selectedTab === index ? 'black' : '#cccccc'} />
                                    {selectedTab == index && <Text style={{ fontFamily: 'Gilroy-Regular', fontSize: 12, marginLeft: 5 }} >
                                        {
                                            it[0]
                                        }
                                    </Text>}
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    {
                        vehicles.filter((vh) => vh.type_vehicule == arr[selectedTab][0]).map((it, index) => {
                            if (it) {
                                return (
                                    <View style={[styles.rw, { flexWrap: 'wrap', marginBottom: 10 }]} key={"sdfsds 65" + index} >
                                        <Text style={[styles.txt_desc, { flex: 1 }]} >
                                            {
                                                it.description_vehicule
                                            }
                                        </Text>
                                        <View style={[styles.rw, { marginLeft: 10 }]} >
                                            <SelectionControls onChange={(val) => {
                                                if (val >= 0) {
                                                    let tmpSlcVe = [...selectedVehi];
                                                    tmpSlcVe[selectedTab][index] = val;
                                                    setSelectedVehi(tmpSlcVe)
                                                }
                                            }} value={selectedVehi[selectedTab][index]} />

                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </BottomModal>
            }

            {/* <PassengersRow name="car-alt" title="Chats" />
                    <PassengersRow name="motorcycle" title="Chats" />
                    <PassengersRow name="shuttle-van" title="Chats" />
                    <PassengersRow name="caravan" title="Chats" /> */}
            <TouchableOpacity onPress={() => {
                // console.log(destinations[selectedDest[0]].data[selectedDest[1]][0]);
                // console.log(destinations[selectedDest1[0]].data[selectedDest1[1]][0]);
                // console.log(selectedDates)

                let arro = [['Adultes', 'Adulte', 'nb_adultes'], ['Bébés', 'bébé', 'nb_bebes'], ['Enfants', 'enfant', 'nb_enfants'], ['Chats', 'Chat', 'nb_chats'], ['Chiens', 'Chien', 'nb_chiens']];
                let tmpSH = {}
                let tmpSH1 = {}

                if (selectedBtn == 0 && selectedDates.length == 2 && selectedDest1[0] != -1 && selectedDest1[1] != -1 && selectedDest[0] != -1 && selectedDest[1] != -1 || selectedBtn == 1 && selectedDates.length == 1 && selectedDest[0] != -1 && selectedDest[1] != -1) {
                    let summedStr = ''

                    selectedVehi.forEach((it, index) => {
                        // console.log('---------------------')
                        let sum = 0;

                        selectedVehi[index].forEach((num) => {
                            sum += num
                        })

                        tmpSH[arr[index][4]] = sum
                        // console.log(selectedVehi[index])
                        // console.log(, sum)
                        summedStr += sum == 0 ? '' : sum > 1 ? (summedStr.length > 0 ? ' ' : '') + sum + ' ' + arr[index][2] : (summedStr.length > 0 ? ' ' : '') + sum + ' ' + arr[index][3]
                        // console.log('---------------------')
                    })


                    let summedStr1 = '';
                    selectedPeople.forEach((it, index) => {
                        let sum = it;
                        tmpSH1[arro[index][2]] = it
                        summedStr1 += sum == 0 ? '' : sum > 1 ? (summedStr1.length > 0 ? ' + ' : '') + sum + ' ' + arro[index][0] : (summedStr1.length > 0 ? ' + ' : '') + sum + ' ' + arro[index][1]
                    })

                    // console.log(summedStr)
                    // console.log(summedStr1)

                    if (summedStr.length > 0 && summedStr1.length > 0) {
                        setLoading(true);
                        let nbPassengers = 0

                        Object.keys(tmpSH1).forEach((key) => {
                            nbPassengers += tmpSH1[key]
                        })

                        navigation.navigate('search', { dest1: destinations[selectedDest[0]].data[selectedDest[1]][0], dest2: destinations[selectedDest1[0]].data[selectedDest1[1]][0], selectedDates, passengers: summedStr1, vehicles: summedStr, obj_ve_pass: { ...tmpSH1, ...tmpSH }, nbPassengers })
                        setTimeout(() => {
                            setLoading(false)
                        }, 100)
                    } else {
                        setAlert({ type: 'warn', msg: 'il faut choisir toutes les informations nécessaires' })
                        setTimeout(() => {
                            setAlert({ type: '', msg: '' })
                        }, 5000);
                    }

                } else {
                    setAlert({ type: 'warn', msg: 'il faut choisir toutes les informations nécessaires' })
                    setTimeout(() => {
                        setAlert({ type: '', msg: '' })
                    }, 5000);
                }

                // console.log(selectedVehi, '-----------', selectedPeople)
            }} style={[styles.btn, { width: 'auto', flexDirection: 'row', paddingHorizontal: 15 }]} >
                {!loading ? <Feather name="search" size={20} color="white" /> :
                    <ActivityIndicator size={17} color='white' />}
                <Text style={{ color: 'white', fontFamily: 'Gilroy-Bold', marginLeft: 10 }}>
                    Rechercher
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight
    },
    rw: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fi_sc: {
        backgroundColor: Colors.main,
        paddingHorizontal: 30,
        paddingTop: 20,
        borderBottomLeftRadius: 60,
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    white: {
        color: 'white'
    },
    btn: {
        backgroundColor: Colors.main,
        position: 'absolute',
        bottom: 70,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 20,
        // paddingTop: 20,
        zIndex: 5,
        // right: 10,
        alignSelf: 'center'
    },
    txt_ntb: {
        fontFamily: 'Gilroy-Bold',
        color: 'white',
        textTransform: 'uppercase',
    },
    txt_desc: {
        fontFamily: 'Gilroy-Bold',
        fontSize: 13,
    },
    selectedBtn: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: Colors.main, borderRadius: 25 },
    resp_txt: {
        fontSize: isBig ? 20 : 15
    }
})
