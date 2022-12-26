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


import styles from '../../styles'

/*
===== TODO =====
*/

const Signup = ({navigation}) => {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [curPw, setCurPw] = useState('')
    const [name, setName] = useState('')
    const [bitrh, setBirth] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [signup, setSignup] = useState(false)

    const handleInputId = () => {

    }
    const handleInputPw = () => {
        
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1, backgroundColor:'#5471ff'}} behavior='padding' keyboardVerticalOffset={30}>
                <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
                    <KeyboardAwareScrollView style={styles.idInputView} contentContainerStyle={{margin: '3%'}}>
                        <Text style={[styles.inputTitleText, {marginTop: '10%',}]}>아이디</Text>
                        <TextInput style={styles.signupInput}/>

                        <Text style={styles.inputTitleText}>비밀번호</Text>
                        <TextInput style={styles.signupInput}

                        />

                        <Text style={styles.inputTitleText}>비밀번호 재확인</Text>
                        <Text>비밀번호가 맞지 않습니다</Text>
                        <TextInput style={styles.signupInput}/>

                        <Text style={styles.inputTitleText}>이름</Text>
                        <TextInput style={styles.signupInput}/>

                        <Text style={styles.inputTitleText}>생년월일</Text>
                        <TextInput style={styles.signupInput}/>

                        <Text style={styles.inputTitleText}>이메일</Text>
                        <TextInput style={styles.signupInput}/>

                        <Text style={styles.inputTitleText}>휴대전화</Text>
                        <TextInput style={styles.signupInput}/>

                        {true ? <TouchableOpacity 
                        style={[styles.loginButton, {height: '15%',}]}
                        onPress={() => {
                            // navigation.push('SignupResult')
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
                        <Dialog.Button label="아니오" onPress={()=>setSignup(false)}></Dialog.Button>
                        <Dialog.Button label="예" onPress={() => {}}></Dialog.Button>
                    </Dialog.Container>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Signup