import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    ImageBackground,
    ActivityIndicator,
    Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

import styles from '../../styles'
import {currentUserid} from './recoil/atom'


/*
===== TODO =====
- 자동로그인은 스플래시 뜨는동안 화면 넘어가게 하면 될듯?
*/

const Login = ({navigation}) => {
    const [userid, setUserId] = useState('')
    const [userpw, setUserPw] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [toggleAutoLogin, setToggleAutoLogin] = useState(false)

    const login = () => {
        if(!userid){
            Alert.alert("아이디를 입력해주세요.")
        }else if(!userpw){
            Alert.alert("비밀번호를 입력해주세요.")
        }else{
            setIsLoading(true)
            if(userid.length > 0 && userpw.length > 0){
                console.log(userid, userpw)
                axios.post('/login', {
                    id: userid,
                    pw: Base64.stringify(sha256(userpw))
                })
                .then(data => {
                    if(data.status == 200){
                        // 자동로그인
                        AsyncStorage.setItem('userid', userid, () => {
                            console.log("유저 아이디 저장 완료")
                        })
                        AsyncStorage.setItem('userpw', Base64.stringify(sha256(userpw)), () => {
                            console.log("유저 비밀번호 저장 완료")
                        })
                        navigation.reset({routes:[{name: 'Main', params:{id: userid}}]})
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    console.error(err.request._response)
                    if(err.request.status == 401){ // 내가 준 애러
                        const errorJson = JSON.parse(err.request._response)
                            Alert.alert(errorJson.text)
                    }
                })
            }
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('userid', (err, id) => {
            if(id != null){
                AsyncStorage.getItem('userpw', (err, pw) => {
                    axios.post('/login', {
                        id: id,
                        pw: pw
                    })
                    .then(data => {
                        if(data.status == 200){
                            // 자동로그인
                            navigation.reset({routes:[{name: 'Main', params:{id: id}}]})
                        }
                    })
                    .catch(err => {
                        setIsLoading(false)
                        if(err.request.status == 401){ // 내가 준 애러
                            const errorJson = JSON.parse(err.request._response)
                                Alert.alert("오류가 발생했습니다.", "다시 로그인 해주세요.")
                        }
                    })
                })
            }
        })
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <View style={styles.logoView}>
                    <ImageBackground source={require('../../assets/image/safety_logo.png')} style={styles.loginLogoBackground}/>
                    <ImageBackground source={require('../../assets/image/safenyang.png')} style={styles.loginNyangBackground}/>
                    </View>
                    <View style={styles.idInputView}>
                        <Text style={[styles.inputTitleText, {marginTop: '10%',}]}>아이디</Text>
                        <TextInput 
                        style={styles.input} 
                        onChangeText={setUserId} 
                        autoCapitalize='none'
                        placeholder="아이디"
                        />
                        <Text style={styles.inputTitleText}>비밀번호</Text>
                        <TextInput 
                        style={styles.input}
                        onChangeText={setUserPw}
                        autoCapitalize='none'
                        placeholder="비밀번호"
                        secureTextEntry={true}
                        />
                        <TouchableOpacity 
                        style={styles.loginButton}
                        activeOpacity={0.8}
                        onPress={() => login()}>
                            <Text style={styles.loginButtonText}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top: '7%', left: '5%'}}
                        onPress={() => {
                            navigation.push('SignupTerms')
                        }}>
                            <Text style={styles.signupText}>아이디가 없으신가요? 회원가입하기</Text>
                        </TouchableOpacity>
                    </View>
                    {isLoading && [<View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray', opacity: 0.5}}></View>,
                    <View style={{position: 'absolute',top: '37.5%', left:'25%', width: '50%', height: '25%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', opacity: 1}}>
                        <Text style={[styles.mainFont, styles.textXl, {marginVertical: '20%'}]}>로그인 중</Text>
                        <ActivityIndicator size="large"/>
                    </View>]}
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Login