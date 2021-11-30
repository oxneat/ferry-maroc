import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

import { MaterialIcons } from '@expo/vector-icons';

import { CompareDates } from '../helpers/Dates';

// let arr = ['01/10/2021', '16/10/2021', '24/10/2021', '01/11/2021', '09/11/2021', '17/11/2021']

export default function Calendar({ arr, onPress, selectedDate, type }) {

    const [DayCurrent, setDayCurrent] = useState(0);

    const [selectedRange, setSelectedRange] = useState(['', '']);

    let onPrev = () => setDayCurrent(DayCurrent - 1);

    let onNext = () => setDayCurrent(DayCurrent + 1);

    let date = dayjs().add(DayCurrent, 'month').format('DD/MM/YYYY');

    let count = dayjs().add(DayCurrent, 'month').daysInMonth();

    let items = [];

    let currentDate = dayjs().format('DD/MM/YYYY');

    let month = dayjs().format('DD/MM/YYYY').split('/')[1];

    let currentMonth = date.split('/')[1];

    let year = dayjs().format('DD/MM/YYYY').split('/')[2];

    let currentYear = date.split('/')[2];

    let selectedDay = date.split('/')[0];

    console.log("--------------------------- Arr -----------------------------------")
    console.log(arr)
    console.log("--------------------------- Arr -----------------------------------")

    for (let i = 0; i < count; i++) {
        // let bgColor = i + 1 == currentDay && year == currentYear && month == currentMonth ? '#414780' : currentMonth < month || currentYear < year ? '#c7c7c7' : (i + 1 > currentDay && currentMonth == month) || (currentYear > year) || currentMonth > month ? 'white' : '#c7c7c7';
        let tmpSelected = `${i + 1 < 10 ? "0" + (i + 1) : i + 1}/${currentMonth}/${currentYear}`;

        let enabled = arr.findIndex((it) => it == tmpSelected) != -1 && CompareDates(tmpSelected, currentDate, '>=')

        // if (!(selectedDate != '' && type && type == "retour" && CompareDates(tmpSelected, selectedDate, '>=') && enabled)) {
        //     if (selectedDate == '') {
        //         enabled = enabled
        //     } else {
        //         enabled = false
        //     }
        // }

        // console.log("-------------------------------- selectedRange --------------------------------------");
        // console.log(selectedRange, " ", tmpSelected)
        // console.log(isBetween(selectedRange[0], selectedRange[1], tmpSelected) ? 'red' : "rgba(0,0,0,0)")
        // console.log("-------------------------------- selectedRange --------------------------------------");

        console.log('--------------------------------TMP SELECTED----------------------------------')
        console.log(tmpSelected, currentDate)
        console.log('--------------------------------TMP SELECTED----------------------------------')

        items.push(<View key={i + "caledar item"} style={{
            width: 50,
            height: 50,
            backgroundColor: "rgba(0,0,0,0)"
        }} >
            <TouchableOpacity disabled={!enabled} onPress={() => onPress(tmpSelected)} style={{
                alignItems: 'center', justifyContent: 'center', height: 40, width: 40, borderRadius: 20, backgroundColor: enabled ? "white" : '#c7c7c7', margin: 5, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                borderWidth: 0,
                borderColor: 'rgba(0,0,0,0)'
            }} >
                {/* i + 1 == currentDay && year == currentYear && month == currentMonth ? 'white' : currentMonth < month || currentYear < year ? 'white' : (i + 1 > currentDay && currentMonth == month) || (currentYear > year) || currentMonth > month ? 'black' : 'white' */}
                <Text style={{ fontFamily: 'Gilroy-Bold', color: 'black' }} >
                    {
                        i + 1
                    }
                </Text>
            </TouchableOpacity>
        </View>)
    }

    // useEffect(() => {
    //     console.log("----------------------- selectedRange selectedRange")
    //     console.log(selectedRange)
    //     console.log("----------------------- selectedRange selectedRange")
    // }, [selectedRange])



    return <>
        <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
            <TouchableOpacity onPress={onPrev} style={{ height: 30, width: 30, borderRadius: 15, alignItems: 'center', flexDirection: 'row' }} >
                <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{ position: 'relative', left: 3 }} />
                <Text>
                    {
                        dayjs(date.split('/')[1] + "-" + date.split('/')[0] + "-" + date.split('/')[2], 'MM-DD-YYYY').add(-1, 'month').format("MMM")
                    }
                </Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Gilroy-Bold', fontSize: 15 }} >
                {
                    date
                }
            </Text>
            <TouchableOpacity onPress={onNext} style={{ height: 30, width: 30, borderRadius: 15, alignItems: 'center', flexDirection: 'row' }} >
                <Text >
                    {
                        dayjs(date.split('/')[1] + "-" + date.split('/')[0] + "-" + date.split('/')[2], 'MM-DD-YYYY').add(1, 'month').format("MMM")
                    }
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }} >
            {
                items
            }
        </View>
    </>;
}

// eeeconst styles = StyleSheet.create({})

// () => {
    // let tmpSelectedDay = [...selectedRange];

    // if (tmpSelectedDay[0].length === 0 && tmpSelectedDay[1].length === 0) {
    //     tmpSelectedDay[0] = tmpSelected;

    // } else if (tmpSelectedDay[0].length > 0 && tmpSelectedDay[1].length === 0) {

    //     if (new Date(tmpSelectedDay[0]) > new Date(tmpSelected)) {
    //         tmpSelectedDay[0] = tmpSelected;
    //     } else {
    //         tmpSelectedDay[1] = tmpSelected;
    //     }

    // } else if (tmpSelectedDay[0].length === 0 && tmpSelectedDay[1].length > 0) {

    //     if (new Date(tmpSelectedDay[1]) > new Date(tmpSelected)) {
    //         tmpSelectedDay[0] = tmpSelected;
    //     } else {
    //         tmpSelectedDay[1] = tmpSelected;
    //     }
    // } else if (tmpSelectedDay[0].length > 0 && tmpSelectedDay[1].length > 0) {

    //     // console.log(tmpSelectedDay, tmpSelected)

    //     if (tmpSelectedDay[0] == tmpSelected) {
    //         console.log("------------------------------- IS EQUAL -------------------------------")
    //         tmpSelectedDay[0] = '';
    //         tmpSelectedDay[1] = '';
    //     } else if (new Date(tmpSelectedDay[1]) > new Date(tmpSelected)) {
    //         tmpSelectedDay[0] = tmpSelected;
    //     } else {
    //         tmpSelectedDay[1] = tmpSelected;
    //     }
    // }

    // setSelectedRange(tmpSelectedDay);


    // const date1 = dayjs(selectedDay[1])
    // date1.diff('2018-06-05', 'month', true)
    // selectedDay[0]


// }