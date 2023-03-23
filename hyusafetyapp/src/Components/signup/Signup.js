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
    Platform,
    ScrollView 
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import { useForm, Controller} from 'react-hook-form'
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from '../../../styles'
import axios from 'axios'

import validate from '../Hooks/signupValidate'

/*
===== TODO =====
1. 과장님이 세부사항 정해주시면 폼이랑 데이터베이스 다시 짜기
2. useForm 써서 정리하기
*/

const Signup = ({navigation}) => {
    const [isIdCheck, setIsIdCheck] = useState(false)
    const [idCheckText, setIdCheckText] = useState('')
    const [isIdCheckTextVisible, setIsIdCheckTextVisible] = useState(false)
    const [pwVisible, setPwVisible] = useState(false)
    const [birth, setBirth] = useState('')
    const [birthOpen, setBirthOpen] = useState(false)
    const [phone, setPhone] = useState('')

    const [signup, setSignup] = useState(false)

    const { control, handleSubmit, formState: { errors }, getValues, } = useForm({
        defaultValues: {
            id: '',
            pw: '',
            checkPw: '',
            name: '',
            email: '',
        },
    });

    const dateToString = (date) => {
        let strDate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
        return strDate   
    }

    const handleIdCheck = () => {
        setIsIdCheckTextVisible(true)
        axios.get('/signup/idcheck', {
            params:{id: getValues('id')}
        })
        .then(data => {
            if(data.status == 200){
                setIsIdCheck(true)
                setIdCheckText("사용가능한 아이디 입니다.")
            }
        })
        .catch(err => {
            // console.error(err.request._response)
            if(err.request.status == 412){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                console.log(errorJson.text)
                setIsIdCheck(false)
                setIdCheckText("사용할 수 없는 아이디 입니다.")
            }
        })
    }

    const onSubmit = data => {
        console.log(data)
        setSignup(false)
        axios.post('/signup', {
            ...data,
            pw: Base64.stringify(sha256(getValues('pw'))),
            birth: birth,
            phone: phone
        })
        .then(res => {
            if(res.status == 201){
                // 자동로그인
                navigation.reset({routes:[{name: 'SignupResult'}]})
            }
        })
        .catch(err => {
            console.error(err.request._response)
            if(err.request.status == 412){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                console.log(errorJson.text)
            }
        })
    }

    useEffect(() => {
        if (phone.length === 10) {
            setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phone.length === 13) {
            setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        
    }, [phone])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* <KeyboardAvoidingView style={{flex: 1, backgroundColor:'#5471ff'}} behavior='padding' keyboardVerticalOffset={30}> */}
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <KeyboardAwareScrollView style={styles.idInputView} contentContainerStyle={{height:'120%', margin: '3%'}}>
                    <Text style={[styles.guideText, {marginBottom: 10}]}>* 필수 영역 입니다.</Text>
                    <Text style={[styles.inputTitleText, {marginTop: '10%',}]}><Text style={[styles.guideText]}>*</Text> 아이디</Text>
                    {isIdCheckTextVisible && <Text style={[styles.warningText, isIdCheck && {color: 'green'}]}>{idCheckText}</Text>}
                    <View style={{flexDirection:'row', height: '10%'}}>
                    <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.signupInput, {width:'70%', height: '50%', marginRight: 5,}, errors.id && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={val => {
                                    onChange(val)
                                    setIsIdCheckTextVisible(false)
                                    setIsIdCheck(false)
                                }}
                                value={value}
                                autoCapitalize='none'/>
                            )}
                            name="id"
                            />
                        
                        <TouchableOpacity style={styles.idcheckButton}
                            activeOpacity={0.8}
                            onPress={() => {
                                handleIdCheck()
                            }}>
                                <Text style={[styles.mainFont, styles.textSm, {color: 'white'}]}>중복확인</Text>
                        </TouchableOpacity>
                    </View>

                        <Text style={styles.inputTitleText}><Text style={[styles.guideText]}>*</Text> 비밀번호</Text>
                        <View style={{flexDirection:'row', height: '10%'}}>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.signupInput, {height: '50%'}, errors.pw && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize='none'
                                secureTextEntry={!pwVisible}/>
                            )}
                            name="pw"
                            />
                            <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setPwVisible(!pwVisible)
                            }}>
                                {pwVisible 
                                ? 
                                <Ionicons name="ios-eye" size={30}></Ionicons>
                                :
                                <Ionicons name="ios-eye-off" size={30}></Ionicons>
                                }

                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputTitleText}><Text style={[styles.guideText]}>*</Text> 비밀번호 확인</Text>
                        { getValues('pw') != getValues('checkPw') && <Text style={styles.warningText}>비밀번호가 맞지 않습니다</Text>}
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.signupInput, errors.pwCheck && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize='none'
                                secureTextEntry={true}/>
                            )}
                            name="checkPw"
                            />
                        

                        <Text style={styles.inputTitleText}><Text style={[styles.guideText]}>*</Text> 이름</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.signupInput, errors.name && {borderBottomColor: 'red'}]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize='none'/>
                            )}
                            name="name"
                            />

                        <Text style={styles.inputTitleText}><Text style={[styles.guideText]}>*</Text> 생년월일</Text>
                        <TouchableOpacity
                        onPress={() => {
                            setBirthOpen(true)
                        }}>
                            <Text style={[styles.mainFont, styles.textLg, {margin: 15}]}>{birth ? dateToString(birth) : '[ 선택 ]'}</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={birthOpen}
                            date={birth ? birth : new Date()}
                            onConfirm={(date) => {
                            setBirthOpen(false)
                            console.log(date)
                            setBirth(date)
                            }}
                            onCancel={() => {
                            setBirthOpen(false)
                            }}
                            maximumDate={new Date()}
                            title="생년월일"
                            confirmText='완료'
                            cancelText='취소'
                            locale='ko-KR'
                            mode='date'
                        />

                        <Text style={styles.inputTitleText}><Text style={[styles.guideText]}>*</Text> 이메일</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput style={[styles.signupInput]}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize='none'/>
                            )}
                            name="email"
                            />

                        <Text style={styles.inputTitleText}><Text style={[styles.guideText]}>*</Text> 휴대전화</Text>
                        <TextInput style={styles.signupInput}
                        onChangeText={setPhone}
                        value={phone}
                        keyboardType="number-pad"
                        autoCapitalize='none'/>

                        {isIdCheck
                        ? 
                        <TouchableOpacity 
                        style={[styles.loginButton, {height: '15%',}]}
                        onPress={() => {
                            if(!phone){
                                Alert.alert("전화번호가 작성되지 않았습니다.")
                            }else if(!birth){
                                Alert.alert("생년월일이 선택되지 않았습니다.")
                            }else{
                                setSignup(true)
                            }
                            
                        }}
                        activeOpacity={0.8}>
                            <Text style={styles.loginButtonText}>가입하기</Text>
                        </TouchableOpacity>
                        :
                        <View
                        style={[styles.loginButton, {height: '10%', backgroundColor: '#dcdcdc'}]}>
                            <Text style={[styles.loginButtonText, {color: 'gray'}]}>가입하기</Text>
                        </View>}
                        
                    </KeyboardAwareScrollView>


                    <Dialog.Container visible={signup}>
                        <Dialog.Title>
                            가입하시겠습니까?
                        </Dialog.Title>
                        <Dialog.Description>
                            맞게 입력하였는지 다시한번 확인해주세요.
                        </Dialog.Description>
                        <Dialog.Button label="아니오" onPress={()=>{
                            setSignup(false)
                            }}></Dialog.Button>
                        <Dialog.Button label="예" onPress={handleSubmit(onSubmit)}></Dialog.Button>
                    </Dialog.Container>
                </SafeAreaView>
            {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
    )
}

export default Signup