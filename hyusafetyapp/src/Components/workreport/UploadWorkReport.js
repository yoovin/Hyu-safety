import { 
    View, 
    Text, 
    SafeAreaView,
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Alert,
    Dimensions,
    ActivityIndicator,
    BackHandler,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserInfo } from '../recoil/atom'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox'
import { useForm, Controller} from 'react-hook-form'
import { usePrevState } from '../Hooks/usePrevState'
import DatePicker from 'react-native-date-picker'

import Navi from '../Navi'
import styles from '../../../styles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

/*
===== Checklists =====
*/
import checklists from './checklists'
import WorkChecklist from './checklist/WorkChecklist'

import WorkSubmit from './WorkSubmit'
import CustomAlert from '../CustomAlert'



/*
===== TODOS =====
ㅇ. 제출하고 바로 나가지게 하기... 알럿이 왜 뜨냐
d. 서명 이미지 보내면 서버에서 0사이즈로 나온다...
*/

const UploadWorkReport = ({navigation, route}) => {
    const [isUploading, setIsUploading] = useState(false) // 업로드 중 컴포넌트 띄우기용
    const [curpage, setCurpage] = useState(0) // 페이지 확인
    const userInfo = useRecoilValue(currentUserInfo) // 유저정보
    const [workChecklists, setWorkChecklists] = useState(new checklists().checklist) // 체크리스트

    const [sign, setSign] = useState('') // 서명
    const [canPressNextButton, setCanPressNextButton] = useState(false) // 다음 버튼 누르기 여부 확인

    const prevPage = usePrevState(curpage) // 이전 페이지 (이전, 다음 여부 확인)

    const [startDateOpen, setStartDateOpen] = useState(false)
    const [endDateOpen, setEndDateOpen] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            requestDepart: '',
            position: '',
            name: userInfo.name,
            workPlace: '',
            workContent: '',
            equipmentInput: '',
            workPeople: 0,
            request: '',
            phone: userInfo.phone,
        }
    });

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=> backAction()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const right = canPressNextButton ? 
        <TouchableOpacity
        activeOpacity={0.8}
        style={{alignItems: 'center'}}
        onPress={handleSubmit(data => {
            if(curpage == 7){
                    Alert.alert("양식을 제출하시겠습니까?", "",
                    [{
                        text: "예",
                        onPress: () => onSubmit(data)
                    },
                    {
                        text: "아니오",
                        onPress: () => console.log("제출안함")
                    }])
            }else{
                if(!sign){
                    Alert.alert("서명이 작성되지 않았습니다.")
                }else if(!startDate){
                    Alert.alert("작업 시작 날짜가 작성되지 않았습니다.")
                }else if(!endDate){
                    Alert.alert("작업 종료 날짜가 작성되지 않았습니다.")
                }else{
                    // 문제없으면 다음페이지
                    nextpage(1)
                    setCanPressNextButton(false)
                }
            }
        })}
        >   
            <Text style={[styles.mainFont, styles.textLg, {color: 'white'}]}>{curpage == 7 ? '제출' : '다음'}</Text>
        </TouchableOpacity>
    :
    <TouchableOpacity
    activeOpacity={0.8}
    style={{alignItems: 'center'}}
    onPress={()=> {
    }}
    >   
        <Text style={[styles.mainFont, styles.textLg, {color: 'gray'}]}>{curpage == 7 ? '제출' : '다음'}</Text>
    </TouchableOpacity>

    const dateToString = (date) => {
        let strDate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
        return strDate
    }

    const nextpage = (num) => {
        if(curpage + num >= 0 && curpage + num < 8){
            setCurpage(page => page+num)
        }
    }

    const onSubmit = data => {
        setIsUploading(true)
        const formData = new FormData()
        formData.append('id', userInfo.id)
        formData.append('sign', sign)
        formData.append('startDate', startDate.toString())
        formData.append('endDate', endDate.toString())
        for(let key in data){
            formData.append(key, data[key])
        }

        for(let i = 0; i < workChecklists.length-1; i++){
            if(workChecklists[i].checked){ // formdata에 체크리스트 항목 넣는거,,
                for(let val of workChecklists[i].checklist){
                    formData.append(`${workChecklists[i].title_eng}_checked`, val.checked)
                    formData.append(`${workChecklists[i].title_eng}_reason`, val.reason)
                }
            }
        }
        axios.post('/workreport/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(async res => {
            if(res.status == 201){
                setIsUploading(false)
                setTimeout(() => {
                    Alert.alert("업로드 되었습니다.","", [
                    {   text:"확인",
                        onPress: async () => {
                            navigation.pop()
                            route.params.refreshSuggestion()
                    }}])
                }, 0)
            }
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

    const changeCheckWork = (idx, value) => {
        setWorkChecklists(works => {
            const cur = [...works]
            cur[idx].checked = value
            return cur
        })
    }

    const checkWorkChecklist = (idx, list) => {
        setWorkChecklists(works => {
            const cur = [...works]
            cur[idx].checklist = list
            return cur
        })
    }

    const backAction = () => {
        if(curpage <= 0){
            Alert.alert("나가시겠습니까?","쓰던 내용은 저장되지 않습니다.", [
                {   text:"아니오",
                    onPress: () => {
                },
                style: 'cancel'
                },
                {   text:"예",
                    onPress: () => {
                    navigation.pop()
                    route.params.refreshSuggestion()
                }}]) 
        }else{
            nextpage(-1)
            setCanPressNextButton(true)
        }
    }

    /*
    ===== USE EFFECT =====
    */

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        )

        return() => {
            // setWorkChecklists({})
            console.log('uploadworkreport 컴포넌트 사라짐')
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        console.log(workChecklists)
    }, [workChecklists])

    useEffect(() => {
        console.log(`curpage ${curpage}`)
        console.log(prevPage)

        if(curpage > 0 && curpage <= 6){
            if(workChecklists[curpage-1].checked){
                console.log(`${curpage} checked`)
            }
            else{
                if (prevPage > curpage){
                    setCurpage(page => page-1)
                }else{
                    setCurpage(page => page+1)
                }
            }
        }
    }, [curpage])

    useEffect(() => {
        setCanPressNextButton(false)
        for(let i = 0; i < workChecklists.length; i++){
            if(workChecklists[i].checked){
                setCanPressNextButton(true)
            }
        }
    }, [workChecklists])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={0}>
            <Navi left={left} title="안전작업양식작성" right={right}/>
            {curpage > 0 && curpage <= 7
            ?
                curpage == 7 ?
                    <WorkSubmit setCanPressNextButton={setCanPressNextButton} content={workChecklists} img={sign}/>
                :
                workChecklists[curpage-1].checked &&
                <WorkChecklist setCanPressNextButton={setCanPressNextButton} content={workChecklists[curpage-1]} checkWorkChecklist={checkWorkChecklist} idx={curpage-1}/>
            :
                <SafeAreaView style={{flex:1}}>
                    <KeyboardAwareScrollView style={{margin: 15}}>
                        <Text style={[styles.guideText, {marginBottom: 10}]}>* 필수 영역 입니다.</Text>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                            <Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>신청부서</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                style={[styles.workInput, {width: '50%', textAlign: 'center'}, errors.requestDepart && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="requestDepart"
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>직책</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '15%', textAlign: 'center'}, errors.position && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="position"
                            />
                            
                            <Text style={[styles.guideText, {marginLeft: 10, marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>성명</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                style={[styles.workInput, {width: '40%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                                placeholder={userInfo.name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="name"
                            />
                            <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('DrawSign', {sign: sign, setSign: setSign})
                            }}>
                                <Text style={[styles.mainFont, styles.textSm, {marginLeft: 10}, sign ? {color: 'green'} : {color: 'gray'}]}>{"[ 서명 ]"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>연락처</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '75%', textAlign: 'center'}, errors.phone && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="number-pad"
                                />
                            )}
                            name="phone"
                            />
                        </View>
                        <View style={{flex: 1, marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}><Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>허가요청기간</Text>
                            <View style={{flex: 1, marginTop: 5}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 3}}>
                                    <TouchableOpacity
                                    onPress={() => {
                                        setStartDateOpen(true)
                                    }}>
                                        <Text style={[styles.mainFont, styles.textLg]}>{startDate ? dateToString(startDate) : '[ 선택 ]'}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.mainFont, styles.textLg]}>부터</Text>
                                    <DatePicker
                                        modal
                                        open={startDateOpen}
                                        date={new Date()}
                                        onConfirm={(date) => {
                                        setStartDateOpen(false)
                                        console.log(date)
                                        setStartDate(date)
                                        }}
                                        onCancel={() => {
                                        setStartDateOpen(false)
                                        }}
                                        minimumDate={new Date()}
                                        title="작업 시작 일자"
                                        confirmText='완료'
                                        cancelText='취소'
                                        locale='ko-KR'
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 3}}>
                                    <TouchableOpacity
                                    onPress={() => {
                                        setEndDateOpen(true)
                                    }}>
                                        <Text style={[styles.mainFont, styles.textLg]}>{endDate ? dateToString(endDate) : '[ 선택 ]'}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.mainFont, styles.textLg]}>까지</Text>
                                    <DatePicker
                                        modal
                                        open={endDateOpen}
                                        date={new Date()}
                                        onConfirm={(date) => {
                                        setEndDateOpen(false)
                                        setEndDate(date)
                                        }}
                                        onCancel={() => {
                                        setEndDateOpen(false)
                                        }}
                                        minimumDate={startDate ? startDate : new Date()}
                                        title="작업 완료 일자"
                                        confirmText='완료'
                                        cancelText='취소'
                                        locale='ko-KR'
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>작업장소</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '75%', textAlign: 'center'}, errors.workPlace && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="workPlace"
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>작업내용</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '75%', textAlign: 'center'}, errors.workContent && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="workContent"
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.guideText, {marginBottom: '2%'}]}>*</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>작업인원</Text>
                            <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                            <Controller
                            control={control}
                            rules={{
                                required: true,
                                valueAsNumber: true,
                                min: 1
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '75%', textAlign: 'center'}, errors.workPeople && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="number-pad"
                                />
                            )}
                            name="workPeople"
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>  장비투입: </Text>
                            <Controller
                            control={control}
                            rules={{
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '75%', textAlign: 'center'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="equipmentInput"
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems:'center', marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>  요청사항: </Text>
                            <Controller
                            control={control}
                            rules={{
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '75%', textAlign: 'center'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="request"
                            />
                        </View>
                        {workChecklists && <>
                        <View style={{flex: 1, marginBottom: 20}}>
                            <Text style={[styles.mainFont, styles.textLg]}>작업종류</Text>
                            <Text style={[styles.guideText]}>* 해당하는 작업 모두 체크</Text>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center', padding: 10}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                    <CheckBox
                                    value={workChecklists[0].checked}
                                    onValueChange={val => changeCheckWork(0, val)}
                                    ></CheckBox>
                                    <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, workChecklists[0].checked && {color: 'blue'}]}>화기</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                <CheckBox
                                    value={workChecklists[1].checked}
                                    onValueChange={val => changeCheckWork(1, val)}
                                    ></CheckBox>
                                    <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, workChecklists[1].checked && {color: 'blue'}]}>중량물</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                <CheckBox
                                    value={workChecklists[2].checked}
                                    onValueChange={val => changeCheckWork(2, val)}
                                    ></CheckBox>
                                    <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, workChecklists[2].checked && {color: 'blue'}]}>밀폐공간</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems:'center', padding: 10}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                <CheckBox
                                    value={workChecklists[3].checked}
                                    onValueChange={val => changeCheckWork(3, val)}
                                    ></CheckBox>
                                    <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, workChecklists[3].checked && {color: 'blue'}]}>고소</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                <CheckBox
                                    value={workChecklists[4].checked}
                                    onValueChange={val => changeCheckWork(4, val)}
                                    ></CheckBox>
                                    <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, workChecklists[4].checked && {color: 'blue'}]}>굴착</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems:'center',}}>
                                <CheckBox
                                    value={workChecklists[5].checked}
                                    onValueChange={val => changeCheckWork(5, val)}
                                    ></CheckBox>
                                    <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, workChecklists[5].checked && {color: 'blue'}]}>전기</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center', marginBottom: 20}}>
                            <CheckBox
                                    value={workChecklists[6].checked}
                                    onValueChange={val => changeCheckWork(6, val)}
                                    ></CheckBox>
                            <Text style={[styles.mainFont, styles.textLg, {marginLeft: 10}, !workChecklists[6].checked ? {color: 'gray'}: {color: 'blue'}]}>기타: </Text>
                            <Controller
                            control={control}
                            rules={{
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.workInput, {width: '70%', textAlign: 'center'}, !workChecklists[6].checked && { borderBottomColor: 'gray'}]}
                                editable={workChecklists[6].checked}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                />
                            )}
                            name="other_work"
                            />
                        </View>
                        </>}
                    </KeyboardAwareScrollView>
                </SafeAreaView>}
                {isUploading && <CustomAlert text="업로드 중"/>}
            </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default UploadWorkReport