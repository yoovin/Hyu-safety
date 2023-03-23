import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useForm, Controller} from 'react-hook-form'

import styles from '../../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'


import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

import { currentUserInfo } from '../recoil/atom'
import { useRecoilValue} from 'recoil'
import Navi from '../Navi'
import axios from 'axios'

/*
    ===== TODOS =====
    1. 로그아웃 버튼 만들기
*/

const DeleteUser = ({navigation}) => {

    const userInfo = useRecoilValue(currentUserInfo)
    const [canChange, setCanChange] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            curPassword: '',
            modiPassword: '',
            modiPasswordCheck: '',
        }
    });

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=> {
        navigation.pop()
    }}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const onSubmit = data => {
        console.log(data)
        axios.post('/login', {
            id: userInfo.id,
            pw: Base64.stringify(sha256(data.curPassword))
        })
        .then(res => {
            if(res.status == 200){
                Alert.alert("정말로 탈퇴하시겠습니까?", "아이디 및 개인정보는 즉시 파기되며 복구할 수 없습니다.",[
                    {
                        text: "아니오"
                    },
                    {
                        text: "예",
                        onPress: onDelete
                    }
                ])
                
            }else{
                Alert.alert("비밀번호가 맞지 않습니다.")
            }
        })
        .catch(err => {
            console.error(err.request._response)
            if(err.request.status == 401){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                Alert.alert(`${errorJson.text}`)
                console.log()
            }
        })
    }

    const onDelete = () => {
        axios.delete('/user/delete', {})
        .then(res => {
            if(res.status == 200){
                Alert.alert("탈퇴 완료 되었습니다.", "", [
                    {
                        text: '완료',
                        onPress: () => {
                            AsyncStorage.clear()
                            navigation.reset({routes: [{name: "Login"}]})
                        }
                    }
                ])
            }
        })
        .catch(err => {
            console.error(err.request._response)
            if(err.request.status == 401){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                Alert.alert(`${errorJson.text}`)
                console.log()
            }
        })
    }

    useEffect(()=>{
        console.log(userInfo)
    }, [])


    return (
        <View style={{flex:1}}>
            <Navi left={left} title="회원탈퇴"/>
            <View style={{ flex:3, padding: '10%', alignItems:'center', marginBottom: 20}}>
                {canChange 
                ? 
                <>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                    <Text style={[styles.mainFont, styles.textLg]}>비밀번호</Text>
                    <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput 
                            style={[styles.workInput, {width: '83%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                            placeholder="변경할 비밀번호"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                            
                            />
                        )}
                        name="modiPassword"
                        />
                </View>
            <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                <Text style={[styles.mainFont, styles.textLg]}>비밀번호 확인</Text>
                <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: {onChange, onBlur, value}}) => (
                        <TextInput 
                        style={[styles.workInput, {width: '80%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                        placeholder="비밀번호 확인"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize={false}
                        />
                    )}
                    name="modiPasswordCheck"
                    />
                </View>
                </>
                :
                <>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                    <Text style={[styles.mainFont, styles.textLg]}>현재 비밀번호를 입력해주세요.</Text>
                </View>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                    {/* <Text style={[styles.mainFont, styles.textLg]}>전화번호</Text>
                    <Text style={[styles.mainFont, styles.textLg]}>: </Text> */}
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput
                            style={[styles.workInput, {width: '75%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                            placeholder='현재 비밀번호'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                            />
                        )}
                        name="curPassword"
                        />
                </View>
                </>
            }
            </View>
            <View style={{flex:0.5}}>
                    <TouchableOpacity style={styles.logoutButton}
                    onPress={handleSubmit(data => {
                        onSubmit(data)
                    })}>
                        <Text style={styles.logoutButtonText}>{canChange ? '저장하기' : '확인'}</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeleteUser