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
    Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import messaging from '@react-native-firebase/messaging'

import styles from '../../styles'
import {currentUserid} from './recoil/atom'
import CustomAlert from './CustomAlert'


/*
===== TODO =====
- 자동로그인은 스플래시 뜨는동안 화면 넘어가게 하면 될듯?
*/

const Login = ({navigation}) => {
    const [userid, setUserId] = useState('')
    const [userpw, setUserPw] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission()
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
        
        if (enabled) {
            console.log("권한 받아옴")
            return true
        }
    }

    const login = async () => {
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
                    pw: Base64.stringify(sha256(userpw)),
                    fcmToken: await messaging().getToken()
                })
                .then(res => {
                    if(res.status == 200){
                        // 로그인
                        AsyncStorage.setItem('userid', userid, () => {
                            console.log("유저 아이디 저장 완료")
                        })
                        AsyncStorage.setItem('userpw', Base64.stringify(sha256(userpw)), () => {
                            console.log("유저 비밀번호 저장 완료")
                        })
                        AsyncStorage.setItem('token', res.data, () => {
                            console.log(res.data)
                            console.log("토큰 저장 완료")
                        })
                        axios.defaults.headers.common["Authorization"]  = `${res.data}`
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
        requestUserPermission()
        .then(() => {
            AsyncStorage.getItem('userid', (err, id) => {
                if(id != null){
                    AsyncStorage.getItem('userpw', async (err, pw) => {
                        axios.post('/login', {
                            id: id,
                            pw: pw
                        })
                        .then(res => {
                            console.log(res)
                            if(res.status == 200){
                                // 자동로그인
                                console.log(res.data)
                                AsyncStorage.setItem('token', res.data, () => {
                                    console.log("토큰 저장 완료")
                                })
                                axios.defaults.headers.common["Authorization"]  = `${res.data}`
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
        
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <KeyboardAvoidingView style={{flex: 1}} behavior='height'>
                    <View style={styles.logoView}>
                    <ImageBackground source={require('../../assets/image/safety_logo.png')} style={styles.loginLogoBackground}/>
                    <ImageBackground source={require('../../assets/image/safenyang.png')} style={styles.loginNyangBackground}/>
                    </View>
                    <View style={[styles.idInputView, {}]}>
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
                    {isLoading && <CustomAlert text="로그인 중"/>}
            </KeyboardAvoidingView>
                </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Login