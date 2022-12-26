import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Dialog from "react-native-dialog"
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from '../../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

/*
    ===== TODOS =====
    1. 로그아웃 버튼 만들기
*/

const Profile = ({navigation}) => {
    const [isLogoutButtonPress, setIsLogoutButtonPress] = useState(false)
    useEffect(()=>{
        
    }, [])
    return (
        <View style={{flex:1}}>
            <View style={{padding: '10%', flex:1}}>
                <View style={{paddingHorizontal: '20%', alignItems: 'center'}}>
                    <Ionicons name="person-circle-outline" size={200} color="black"></Ionicons>
                    <Text style={styles.item}>심유빈</Text>
                </View>
            </View>
            <View style={{flex:1.5, flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Ionicons name="man-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                    <Ionicons name="mail-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                </View>
                <View style={{flex:3}}>
                    <Text style={styles.itemText}>Manager</Text>
                    <Text style={styles.itemText}>soo22839@gmail.com</Text>
                    
                </View>
            </View>
            <View style={{flex:0.5}}>
                    <TouchableOpacity style={styles.logoutButton}
                    onPress={() => {
                        setIsLogoutButtonPress(true)
                    }}>
                        <Text style={styles.logoutButtonText}>로그아웃</Text>
                    </TouchableOpacity>
            </View>

            <Dialog.Container visible={isLogoutButtonPress} contentStyle={styles.dialog}>
                <Dialog.Description>
                    정말 로그아웃 하시겠습니까?
                </Dialog.Description>
                <Dialog.Button label="예" color="black" 
                onPress={() => {
                    setIsLogoutButtonPress(false)
                    AsyncStorage.clear()
                    navigation.reset({routes: [{name: "Login"}]})
                }}></Dialog.Button>
                <Dialog.Button label="아니오" color="black" onPress={()=>setIsLogoutButtonPress(false)}></Dialog.Button>
            </Dialog.Container>
        </View>
    )
}

export default Profile