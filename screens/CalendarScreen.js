import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';

import dayjs from 'dayjs';

let { width, height } = Dimensions.get('window');

import Colors from '../helpers/Colors';

import { CompareDates, isBetween } from '../helpers/Dates';

import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';

import TopBar from '../components/TopBar';

import { AntDesign } from "@expo/vector-icons";
import { TabStateContext } from '../context/TabManager';

let getDays = (max) => {
    let days = []
    for (let i = 1; i <= max; i++) {
        days.push(i);
    }

    return days;
}

let months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',]

let getMonthsNeeded = () => {
    let tmpArr = []
    for (let i = 0; i < 8; i++) {
        let currentDate = dayjs().add(i, 'month');
        let month = currentDate.format('MM');
        let year = currentDate.format('YYYY')

        let numDays = currentDate.daysInMonth()
        tmpArr.push({ title: `${months[parseInt(month) - 1]} ${year}`, length: numDays, month: currentDate.format('MM'), year })
    }
    return tmpArr
}

let getPresentDates = (dates) => {
    let currentDate = dayjs().format('DD/MM/YYYY')
    return dates.filter((date) => {
        return CompareDates(date, currentDate, '>=')
    })
}

export default function CalendarScreen() {
    const { setShowBottomTab } = useContext(TabStateContext);

    const [selectedDates, setSelectedDates] = useState([]);

    const [dates, setDates] = useState([]);

    let navigation = useNavigation();

    useEffect(() => {
        setSelectedDates(params.selected)
    }, [params])

    let { params } = useRoute();

    useEffect(() => {
        if (params && params.dates) {
            // console.log(params.dates);
            let realDates = params.dates.map(item => {
                if (item.includes(' ')) {
                    item = item.split(' ')[0];
                    item = `${item.split('-')[2]}/${item.split('-')[1]}/${item.split('-')[0]}`
                }

                return item
            });

            setDates(realDates)

            // console.log('----------------realDates----------------')
            // console.log(getPresentDates(realDates))
            // console.log('----------------realDates----------------')
        }
    }, []);

    let isFocused = useIsFocused();

    useEffect(() => {
        setShowBottomTab(false);
    }, [isFocused])

    useEffect(() => {
        // console.log('-----------------------params-----------------------')
        // console.log(params)
        // console.log('-----------------------params-----------------------')
        const unsubscribe = navigation.addListener('focus', () => {
            if (params.selected.length > 0 && params.type == 'go') {
                let date1 = dayjs(`${params.selected[0].split('/')[2]}-${params.selected[0].split('/')[1]}-01`)
                // date1.diff(dayjs(), 'month')

                // console.log()
                // console.log('----------Number Of Steps----------')

                let steps = date1.diff(dayjs(dayjs().format('YYYY-MM').toString() + '-01'), 'months');


                let tmpHeight = (width / 6) * 6


                console.log('----------Number Of Steps----------')
                // console.log()

                // if (scrollRef) {
                scrollRef.current.scrollTo({ x: 0, y: steps * tmpHeight, animated: true })
                // }
                console.log('----------Number Of Steps----------')
            }
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])

    const scrollRef = useRef();

    return (
        <View style={styles.wrpr}>
            <TopBar onBack={() => {
                navigation.goBack()
            }} >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('book', { selectedDates })
                }}>
                    <AntDesign name="check" size={24} color="black" />
                </TouchableOpacity>
            </TopBar>
            <ScrollView ref={scrollRef}>
                {
                    getMonthsNeeded().map((itemParent, indexParent) => {
                        // console.log('-----------------Month Needed-----------------------')
                        // console.log(itemParent)
                        // console.log('-----------------Month Needed-----------------------')

                        if (params.type != 'go' && params.selected.length > 0 && CompareDates(`01/${itemParent.month}/${itemParent.year}`, `01/${params.selected[0].split('/')[1]}/${params.selected[0].split('/')[2]}`, '<')) {
                            return;
                        } else {
                            return (
                                <View key={indexParent + ' in par cal'}>
                                    <View style={styles.title_mth}>
                                        <Text style={[styles.txt_reg, { textTransform: 'capitalize', color: 'white' }]}>{itemParent.title}</Text>
                                    </View>
                                    <View style={styles.rw_wrp}>
                                        {
                                            getDays(itemParent.length).map((item, index) => {
                                                let itemDate = `${item}/${itemParent.month}/${itemParent.year}`;
                                                let isValidDate = CompareDates(itemDate, dayjs().format('DD/MM/YYYY'), '>=') && (dates.length > 0 && dates.includes(itemDate));

                                                return (
                                                    <TouchableOpacity onPress={() => {
                                                        let tmpSelDa = [...selectedDates];

                                                        if (params.type == 'go') {
                                                            tmpSelDa = [itemDate]
                                                        } else {
                                                            if (tmpSelDa.length === 0) {
                                                                tmpSelDa.push(itemDate);
                                                            } else if (tmpSelDa.length === 1 && CompareDates(itemDate, tmpSelDa[0], '>')) {
                                                                tmpSelDa.push(itemDate)
                                                            } else if (tmpSelDa.length === 2) {
                                                                if (CompareDates(itemDate, tmpSelDa[0], '>')) {
                                                                    tmpSelDa[1] = itemDate;
                                                                } else if (CompareDates(itemDate, tmpSelDa[0], '<')) {
                                                                    tmpSelDa = [itemDate]
                                                                } else if (CompareDates(itemDate, tmpSelDa[0], '=')) {
                                                                    tmpSelDa = [itemDate]
                                                                }
                                                            }
                                                        }

                                                        setSelectedDates(tmpSelDa)
                                                    }} disabled={!isValidDate} key={index + ' it sin_it'} style={[styles.sin_it, { backgroundColor: selectedDates.length == 0 ? 'white' : selectedDates.length == 1 ? CompareDates(itemDate, selectedDates[0], '=') ? '#fcba03' : 'white' : selectedDates.length == 2 && isBetween(selectedDates[0], selectedDates[1], itemDate) ? '#fcba03' : 'white' }]}>
                                                        <Text style={[styles.txt_bol, { color: isValidDate ? 'black' : '#cfcfcf' }]}>
                                                            {
                                                                item
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            )
                                        }

                                    </View>
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
            {/* <View style={styles.ok_wrpr}>
                <View>
                    <Text style={{ fontSize: 15 }}>
                        {
                            params.type == 'go' ? 'Sélectionnez la date de départ' : 'Sélectionnez la date d\'arrivée'
                        }
                    </Text>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    wrpr: {
        paddingTop: Constants.statusBarHeight,
        position: 'relative'
    },
    rw_wrp: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sin_it: {
        width: width / 6,
        height: width / 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    title_mth: {
        backgroundColor: '#084212',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5
    },
    txt_reg: {
        fontFamily: 'Gilroy-Regular'
    },
    txt_bol: {
        fontFamily: 'Gilroy-Bold'
    },
    ok_wrpr: {
        position: 'absolute',
        width: '100%',
        height: 60,
        backgroundColor: 'red',
        bottom: 0,
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 10
    }
})
