import { StyleSheet,SafeAreaView, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars'

export default function WorkCalendar({navigation, route}) {
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [constructorHasRun, setConstructorHasRun] = useState(false)
    const [markedDates, setMarkedDates] = useState([])
    const [data, setData] = useState('')

    const week = ['일', '월', '화', '수', '목', '금', '토'];

    LocaleConfig.locales['ko'] = {
        monthNames: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
        ],
        monthNamesShort: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
        ],
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    };
    LocaleConfig.defaultLocale = 'ko'

    const onDayHandler = (date) => {
        // if(month != date.month){
        //     setMonth(date.month)
        // }
        console.log(date)
        route.params.setDate(date.dateString)
        navigation.pop()
    }

    const constructor = async() =>{
        if(constructorHasRun) return

        /* Constructor 본문 */

        setConstructorHasRun(true)
    }
    constructor()

    useEffect(() => {
    }, [month])

    return (
    <View style={{flex:1, backgroundColor: 'white'}}>
        <SafeAreaView style={{flex:1}}>
            <Calendar
            theme={{
                'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                        color: 'red'
                    },
                    dayTextAtIndex6: {
                        color: 'blue'
                    }
                }
            }}
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0'
            }}
            monthFormat={'yyyy년 MM월'}
            markedDates={markedDates}

            onDayPress={date => onDayHandler(date)}
            />
        </SafeAreaView>
    </View>
    )
}

// const styles = StyleSheet.create({
//     backButtonText:{
//         fontFamily: 'BMJUA',
//         color: 'white',
//         fontSize: RFPercentage(3),
//     },
    
//     dateText: {
//         fontFamily: 'BMJUA',
//         color: 'black',
//         fontSize: RFPercentage(3),
//     },

//     dotestButton: {
//         top:'10%',
//         left: '25%',
//         width: '50%',
//         height: '80%',
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FFA05A',
//     },
//     dotestText: {
//         fontFamily: "BMJUA",
//         fontSize: RFPercentage(3),
//         color: 'black',
//     },

//     hr: {
//         // marginTop: 10,
//         marginBottom: 10,
//         borderBottomColor: 'gray',
//         borderBottomWidth: 1,
//     },
// })