import { 
    View, 
    Text, 
    SafeAreaView,
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    ScrollView 
} from 'react-native'
import React, { useState } from 'react'
import Dialog from "react-native-dialog"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {SERVER_ADDRESS} from '@env'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from '../../../styles'
import axios from 'axios'

/*
===== TODO =====
1. 과장님이 세부사항 정해주시면 폼이랑 데이터베이스 다시 짜기
2. useForm 써서 정리하기
*/

const Signup = ({navigation}) => {
    const [id, setId] = useState('')
    const [isIdCheck, setIsIdCheck] = useState(false)
    const [idCheckText, setIdCheckText] = useState('')
    const [isIdCheckTextVisible, setIsIdCheckTextVisible] = useState(false)
    const [pw, setPw] = useState('')
    const [curPw, setCurPw] = useState('')
    const [pwVisible, setPwVisible] = useState(false)
    const [name, setName] = useState('')
    const [bitrh, setBirth] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [signup, setSignup] = useState(false)

    const handleIdCheck = () => {
        setIsIdCheckTextVisible(true)
        axios.get(SERVER_ADDRESS + '/signup/idcheck', {
            params:{id: id}
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
                setIdCheckText("사용할 수 없는 아이디 입니다.")
            }
        })
    }

    const handleSubmit = () => {
        axios.post(SERVER_ADDRESS + '/signup', {
            id: id,
            pw: Base64.stringify(sha256(pw)),
            name: name,
            email: email,
            phone: phone
        })
        .then(data => {
            if(data.status == 201){
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


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1, backgroundColor:'#5471ff'}} behavior='padding' keyboardVerticalOffset={30}>
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <KeyboardAwareScrollView style={styles.idInputView} contentContainerStyle={{margin: '3%'}}>
                    <Text style={[styles.inputTitleText, {marginTop: '10%',}]}>아이디</Text>
                    {isIdCheckTextVisible && <Text style={[styles.warningText, isIdCheck && {color: 'green'}]}>{idCheckText}</Text>}
                    <View style={{flexDirection:'row', height: '10%'}}>
                        <TextInput style={[styles.signupInput, {height: '50%', marginRight: 0,}]}
                        onChangeText={val => {
                            setId(val)
                            setIsIdCheck(false)
                            setIsIdCheckTextVisible(false)
                        }}
                        autoCapitalize='none'/>
                        <TouchableOpacity style={styles.idcheckButton}
                            activeOpacity={0.8}
                            onPress={() => {
                                handleIdCheck()
                            }}>
                                <Text style={{fontFamily: 'BMJUA', color: 'white'}}>중복확인</Text>
                        </TouchableOpacity>
                    </View>

                        <Text style={styles.inputTitleText}>비밀번호</Text>
                        <View style={{flexDirection:'row', height: '10%'}}>
                            <TextInput style={[styles.signupInput, {height: '50%'}]}
                            onChangeText={setPw}
                            autoCapitalize='none'
                            secureTextEntry={!pwVisible}
                            />
                            <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setPwVisible(!pwVisible)
                            }}>
                                <Ionicons name="ios-eye" size={30}></Ionicons>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputTitleText}>비밀번호 확인</Text>
                        { pw != curPw && <Text style={styles.warningText}>비밀번호가 맞지 않습니다</Text>}
                            <TextInput style={styles.signupInput}
                            onChangeText={setCurPw}
                            secureTextEntry={true}
                            autoCapitalize='none'/>
                        

                        <Text style={styles.inputTitleText}>이름</Text>
                        <TextInput style={styles.signupInput}
                        onChangeText={setName}
                        autoCapitalize='none'/>

                        <Text style={styles.inputTitleText}>생년월일</Text>
                        <TextInput style={styles.signupInput}
                        onChangeText={setBirth}
                        autoCapitalize='none'/>

                        <Text style={styles.inputTitleText}>이메일</Text>
                        <TextInput style={styles.signupInput}
                        onChangeText={setEmail}
                        autoCapitalize='none'/>

                        <Text style={styles.inputTitleText}>휴대전화</Text>
                        <TextInput style={styles.signupInput}
                        onChangeText={setPhone}
                        autoCapitalize='none'/>

                        {true ? <TouchableOpacity 
                        style={[styles.loginButton, {height: '15%',}]}
                        onPress={() => {
                            setSignup(true)
                        }}
                        activeOpacity={0.8}>
                            <Text style={styles.loginButtonText}>가입하기</Text>
                        </TouchableOpacity>:
                        <View
                        style={[styles.loginButton, {height: '15%', backgroundColor: '#dcdcdc'}]}>
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
                        <Dialog.Button label="예" onPress={() => {
                            handleSubmit()
                        }}></Dialog.Button>
                    </Dialog.Container>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Signup