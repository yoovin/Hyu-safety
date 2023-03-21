import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import messaging from '@react-native-firebase/messaging'

import styles from '../../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { currentUserInfo } from '../recoil/atom'
import { useRecoilValue } from 'recoil'
import Navi from '../Navi'

/*
    ===== TODOS =====
    1. 로그아웃 버튼 만들기
*/

const ProfileSetting = ({navigation}) => {
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)
    const userInfo = useRecoilValue(currentUserInfo)

    const logout = async () => {
        axios.post('/login/logout', {
            id: userInfo.id,
            fcmToken: await messaging().getToken()
        })
        .then(res =>{
            if(res.status === 200){
                AsyncStorage.clear()
                navigation.reset({routes: [{name: "Login"}]})
            }
        })
        .catch(err => {
            Alert.alert(err)
        })

    }

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=> {
        navigation.pop()
    }}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    useEffect(()=>{
        console.log(userInfo)
    }, [])

    return (
        <View style={{flex:1}}>
            <Navi left={left} title="설정"/>
            <ScrollView>
                <TouchableOpacity 
                style={styles.noticeContainer}
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('ModifyProfile')
                }}>
                    <Text style={[styles.noticeTitle]}>프로필 수정</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.noticeContainer}
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('ModifyPassword')
                }}>
                    <Text style={[styles.noticeTitle]}>비밀번호 변경</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.noticeContainer}
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('DeleteUser')
                }}>
                    <Text style={[styles.noticeTitle]}>회원탈퇴</Text>
                </TouchableOpacity>
            </ScrollView>


            
            <View style={{flex:0.5}}>
                    <TouchableOpacity style={styles.logoutButton}
                    onPress={() => {
                        Alert.alert("로그아웃 하시겠습니까?","", [
                            {   text:"아니오",
                                onPress: () => {
                            },
                            style: 'cancel'
                            },
                            {   text:"예",
                                onPress: logout}]) 
                    }}>
                        <Text style={styles.logoutButtonText}>로그아웃</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileSetting