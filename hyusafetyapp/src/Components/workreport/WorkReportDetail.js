import { 
    View, 
    Text, 
    SafeAreaView,
    TextInput, 
    TouchableOpacity, 
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    Dimensions,
    Image,
    ActivityIndicator,
    Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

import Navi from '../Navi'
import styles from '../../../styles'
import axios from 'axios'

/*
===== TODOS =====
ㅇ
*/

const WorkReportDetail = ({navigation, route}) => {
    const [isUploading, setIsUploading] = useState(false)


    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=> {
        navigation.pop()
    }}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const right = 
        <TouchableOpacity
        activeOpacity={0.8}
        style={{alignItems: 'center'}}
        onPress={() => {
                    Alert.alert("제출 된 신고를 삭제하시겠습니까?", "",
                    [{
                        text: "예",
                        onPress: () => onDelete()
                    },
                    {
                        text: "아니오",
                        onPress: () => console.log("삭제안함")
                    }])
            }
        }
        >   
            <Text style={[styles.mainFont, styles.textLg, {color: 'white'}]}>삭제</Text>
        </TouchableOpacity>

    const dateToString = (date) => {
        let strDate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
        return strDate
        
    }

    const onDelete = () => {
        setIsUploading(true)
        axios.post('/workreport/delete', {
            index: route.params.index
        })
        .then(res => {
            setIsUploading(false)
            Alert.alert("삭제 되었습니다.","", [
            {   text:"확인",
                onPress: () => {
                navigation.pop()
                route.params.refreshSuggestion()
            }}])
        })
        .catch(err => {
            setIsUploading(false)
            Alert.alert("에러가 발생했습니다.", err)
            console.error(err.request._response)
            if(err.request.status == 412){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                console.log(errorJson.text)
            }
        })
    }

    /*
    ===== USE EFFECT =====
    */

    useEffect(() => {
        console.log(route.params)
        return () => route.params.refreshSuggestion()
    }, [])

    return (
            <View style={{flex: 1}}>
            <Navi left={left} title={`${route.params.index}번 작업신고`} right={right}/>
            <SafeAreaView style={{flex:1}}>
                    <ScrollView style={{margin: 15, flex:1}}>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>신청부서</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '50%', alignItems: 'center'}]}>
                                <Text>{route.params.request_depart}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>직책</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '15%', alignItems: 'center'}]}>
                                <Text>{route.params.position}</Text>
                            </View>
                            <Text style={[styles.mainFont, styles.textLg]}>  성명</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '70%', paddingLeft: 10, alignItems: 'center'}]}>
                                <Text>{route.params.name}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>연락처</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '85%', alignItems: 'center'}]}>
                                <Text>{route.params.phone}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>허가요청기간</Text>
                            <View style={{flex: 1, marginTop: 5}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 3}}>
                                    {/* <Text style={[styles.mainFont, styles.textLg]}>{dateToString(route.params.start_date)} 부터</Text> */}
                                    <Text style={[styles.mainFont, styles.textLg]}>{dateToString(new Date(route.params.start_date))} 부터</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 3}}>
                                    <Text style={[styles.mainFont, styles.textLg]}>{dateToString(new Date(route.params.end_date))} 까지</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>작업장소</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '80%', alignItems: 'center'}]}>
                                <Text>{route.params.work_place}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>작업내용</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '80%', alignItems: 'center'}]}>
                                <Text>{route.params.work_content}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>작업인원</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <View style={[styles.workInput, {width: '80%', alignItems: 'center'}]}>
                                <Text>{route.params.work_people} 명</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>장비투입: </Text>
                            <View style={[styles.workInput, {width: '80%', alignItems: 'center'}]}>
                                <Text>{route.params.equipment_input}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>요청사항: </Text>
                            <View style={[styles.workInput, {width: '80%', alignItems: 'center'}]}>
                                <Text>{route.params.request}</Text>
                            </View>
                        </View>
                        {route.params.checklist &&
                        <>
                        <View style={{flex: 1, marginBottom: 20}}>
                        <Text style={[styles.mainFont, styles.textLg]}>작업종류</Text>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', padding: 10}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                <CheckBox
                                value={route.params.checklist.fire && true}
                                disabled={true}
                                ></CheckBox>
                                <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, route.params.checklist.fire && {color: 'blue'}]}>화기</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                            <CheckBox
                                value={route.params.checklist.weight && true}
                                disabled={true}
                                ></CheckBox>
                                <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, route.params.checklist.weight && {color: 'blue'}]}>중량물</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                            <CheckBox
                                value={route.params.checklist.closed && true}
                                disabled={true}
                                ></CheckBox>
                                <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, route.params.checklist.closed && {color: 'blue'}]}>밀폐공간</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', padding: 10}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                            <CheckBox
                                value={route.params.checklist.height && true}
                                disabled={true}
                                ></CheckBox>
                                <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, route.params.checklist.height && {color: 'blue'}]}>고소</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                            <CheckBox
                                value={route.params.checklist.excavation && true}
                                disabled={true}
                                ></CheckBox>
                                <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, route.params.checklist.excavation && {color: 'blue'}]}>굴착</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                            <CheckBox
                                value={route.params.checklist.electricity && true}
                                disabled={true}
                                ></CheckBox>
                                <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, route.params.checklist.electricity && {color: 'blue'}]}>전기</Text>
                            </View>
                        </View>
                    </View>
                    </>}
                    {route.params.other_work !== 'undefined' &&
                    <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', marginBottom: 20}}>
                        <CheckBox
                                value={route.params.other_work && true}
                                disabled={true}
                                ></CheckBox>
                        <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}]}>기타: </Text>
                        <View style={[styles.workInput, {width: '70%', alignItems: 'center'}]}>
                            <Text>{route.params.other_work}</Text>
                        </View>
                    </View>}
                        <View style={{flex: 1, marginBottom: 20}}>
                            {route.params.condition === 'approval' 
                            ?   
                                <>
                                <View style={{flexDirection: 'row', marginVertical: 15, alignItems: 'space-between', justifyContent: 'space-evenly'}}>
                                    <Text style={[styles.mainFont, styles.textXl, {marginBottom: 10}]}>관리자승인</Text>
                                    <View style={[styles.conditionCircle, {backgroundColor: 'green'}]}>
                                        <Text style={[styles.textBase, styles.mainFont, {color: 'white'}]}>승인 완료</Text>
                                    </View>
                                </View>
                                <View style={{justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                                        <Text style={[styles.mainFont, styles.textLg]}>부서</Text>
                                        <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                                        <View style={[styles.workInput, {width: '15%', alignItems: 'center'}]}>
                                            <Text>{route.params.per_depart}</Text>
                                        </View>

                                        <Text style={[styles.mainFont, styles.textLg]}>직책</Text>
                                        <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                                        <View style={[styles.workInput, {width: '15%', alignItems: 'center'}]}>
                                            <Text>{route.params.per_position}</Text>
                                        </View>

                                        <Text style={[styles.mainFont, styles.textLg]}>이름</Text>
                                        <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                                        <View style={[styles.workInput, {width: '15%', alignItems: 'center'}]}>
                                            <Text>{route.params.per_name}</Text>
                                        </View>
                                        
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                                        <Text style={[styles.mainFont, styles.textLg]}>요청사항: </Text>
                                        <View style={[styles.workInput, {width: '80%', alignItems: 'center'}]}>
                                            <Text>{route.params.request}</Text>
                                        </View>
                                    </View>
                                </View>
                                </>
                            : 
                            <View style={{flexDirection: 'row', alignItems: 'space-between', justifyContent: 'space-evenly'}}>
                                <Text style={[styles.mainFont, styles.textXl, {marginBottom: 10}]}>관리자승인</Text>
                                {route.params.condition == 'waited' && <View style={[styles.conditionCircle, {backgroundColor: 'orange'}]}><Text style={[styles.textBase, styles.mainFont, {color: 'white'}]}>승인 대기</Text></View> ||
                                route.params.condition == 'refused' && <View style={[styles.conditionCircle, {backgroundColor: 'red'}]}><Text style={[styles.textBase, styles.mainFont, {color: 'white'}]}>승인 거부</Text></View>}
                            </View>
                            }
                        </View>
                    </ScrollView>
                    {isUploading && [<View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray', opacity: 0.5}}></View>,
                    <View style={{position: 'absolute',top: '25%', left:'25%', width: '50%', height: '25%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', opacity: 1}}>
                        <Text style={[styles.mainFont, styles.textXl, {marginVertical: '20%'}]}>삭제 중</Text>
                        <ActivityIndicator size="large"/>
                    </View>]}
                </SafeAreaView>
            </View>
    )
}

export default WorkReportDetail