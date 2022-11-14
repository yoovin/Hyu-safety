import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
} from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

import styles from '../../styles'

/*
===== TODO =====
- 아이디나 비번 틀렸을때 나타나는 ui도 만들어야함
- 아이디저장? 자동로그인?
- 자동로그인은 스플래시 뜨는동안 화면 넘어가게 하면 될듯?
*/

const Login = ({navigation}) => {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [toggleAutoLogin, setToggleAutoLogin] = useState(false)

    const handleInputId = () => {

    }
    const handleInputPw = () => {
        
    }

    const login = () => {
        navigation.reset({routes:[{name: 'Main'}]})
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <View style={styles.logoView}>
                    <Text>Login</Text>
                    </View>
                    <View style={styles.idInputView}>
                        <Text style={[styles.inputTitleText, {marginTop: '10%',}]}>아이디</Text>
                        <TextInput style={styles.input}/>
                        <Text style={styles.inputTitleText}>비밀번호</Text>
                        <TextInput style={styles.input}/>
                        {/* <View>
                            <CheckBox
                            value={toggleAutoLogin}
                            onValueChange={value => setToggleAutoLogin(value)}
                            /><Text>자동 로그인</Text>
                        </View> */}
                        <TouchableOpacity 
                        style={styles.loginButton}
                        activeOpacity={0.8}
                        onPress={() => login()}>
                            <Text style={styles.loginButtonText}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Login