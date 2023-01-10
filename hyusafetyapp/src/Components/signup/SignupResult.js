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
} from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

import styles from '../../../styles'

/*
===== TODO =====
*/

const SignupResult = ({navigation}) => {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [checkAnimation, setCheckAnimation] = useState(false)

    const handleInputId = () => {

    }
    const handleInputPw = () => {
        
    }

    useEffect(() => {
        setTimeout(() => {
            setCheckAnimation(true)
        }, 500)
    }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <View style={styles.logoView}>
                        <ImageBackground source={require('../../../assets/image/safenyang.png')} style={styles.loginNyangBackground}/>
                    </View>
                    <View style={[styles.idInputView, {justifyContent: 'center', alignItems: 'center'}]}>
                        <CheckBox value={checkAnimation} onCheckColor={'green'} onTintColor={'green'}></CheckBox>
                        <Text style={styles.resultText}>회원가입이 완료되었습니다.</Text>
                        <Text style={styles.resultText}>다시 로그인해주세요.</Text>

                    <TouchableOpacity 
                        style={[styles.loginButton, {left: 0, marginVertical: '10%'}]}
                        onPress={() => {
                            navigation.push('Login')
                        }}
                        activeOpacity={0.8}>
                            <Text style={styles.loginButtonText}>돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default SignupResult