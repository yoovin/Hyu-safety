import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useForm, Controller} from 'react-hook-form'

import styles from '../../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { currentUserInfo } from '../recoil/atom'
import { useRecoilState } from 'recoil'
import Navi from '../Navi'
import axios from 'axios'

/*
    ===== TODOS =====
    1. 로그아웃 버튼 만들기
*/

const ModifyProfile = ({navigation}) => {

    const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: userInfo.name,
            phone: userInfo.phone,
            email: userInfo.email,
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
        axios.post('/login/update/info', {
            ...data,
            id: userInfo.id,
            position: userInfo.position
        })
        .then(res => {
            if(res.status == 200){
                setUserInfo(info => {
                    let newInfo = info
                    for(let key in data){
                        newInfo[key] = data[key]
                    }
                    return newInfo
                })
                Alert.alert("저장되었습니다.")
            }else{
                Alert.alert("에러가 발생했습니다 Error.404")
            }
        })
        .catch(err => {
            console.error(err.request._response)
            Alert.alert(`에러가 발생했습니다.`)
            if(err.request.status == 404){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                console.log()
            }
        })
        console.log(data)
    }

    useEffect(()=>{
        console.log(userInfo)
    }, [])


    return (
        <View style={{flex:1}}>
            <Navi left={left} title="프로필 수정"/>
            <View style={{ flex:3, padding: '10%', marginBottom: 20}}>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                    <Text style={[styles.mainFont, styles.textLg]}>이름</Text>
                    <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput 
                            style={[styles.workInput, {width: '83%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                            placeholder={userInfo.name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                            />
                        )}
                        name="name"
                        />
                </View>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                    <Text style={[styles.mainFont, styles.textLg]}>이메일</Text>
                    <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput 
                            style={[styles.workInput, {width: '80%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                            placeholder={userInfo.email}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                            />
                        )}
                        name="email"
                        />
                </View>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems:'center',}}>
                    <Text style={[styles.mainFont, styles.textLg]}>전화번호</Text>
                    <Text style={[styles.mainFont, styles.textLg]}>: </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput
                            style={[styles.workInput, {width: '75%', paddingLeft: 10, textAlign: 'center'}, errors.name && {borderBottomColor: 'red'}]}
                            placeholder={userInfo.phone}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize={false}
                            />
                        )}
                        name="phone"
                        />
                </View>
            </View>
            <View style={{flex:0.5}}>
                    <TouchableOpacity style={styles.logoutButton}
                    onPress={handleSubmit(data => {
                        onSubmit(data)
                    })}>
                        <Text style={styles.logoutButtonText}>저장하기</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModifyProfile