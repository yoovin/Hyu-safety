import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from '../../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { currentUserInfo } from '../recoil/atom'
import { useRecoilValue } from 'recoil'

/*
    ===== TODOS =====
    ㅇ. 프로필 내용 바꾸고 뒤로가기해서 나오면 적용안되어있음.
*/

const Profile = ({navigation}) => {
    const userInfo = useRecoilValue(currentUserInfo)
    useEffect(()=>{
        console.log(userInfo)
    }, [])
    return (
        <View style={{flex:1}}>
            <View style={{padding: '10%', flex:1}}>
                <View style={{paddingHorizontal: '20%', alignItems: 'center'}}>
                    <Ionicons name="person-circle-outline" size={200} color="black"></Ionicons>
                    <Text style={styles.item}>{userInfo.name}</Text>
                </View>
            </View>
            <View style={{flex:1.5, flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Ionicons name="man-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                    <Ionicons name="mail-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                    <Ionicons name="phone-portrait-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                </View>
                <View style={{flex:3}}>
                    <Text style={styles.itemText}>{
                        userInfo.position === 'worker' && '근로자' ||
                        userInfo.position === 'manager' && '관리감독자' ||
                        userInfo.position === 'admin' && '관리자'
                    }</Text>
                    <Text style={styles.itemText}>{userInfo.email}</Text>
                    <Text style={styles.itemText}>{userInfo.phone}</Text>
                </View>
            </View>
            <View style={{flex:0.5}}>
                    <TouchableOpacity style={styles.logoutButton}
                    onPress={() => {
                        navigation.navigate('Setting')
                    }}>
                        <Text style={styles.logoutButtonText}>설정</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile