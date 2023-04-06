import { View, Text, SafeAreaView, Alert, Platform } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecoilRoot } from 'recoil'
import {SERVER_ADDRESS} from '@env'
// import Toast from 'react-native-toast-message'
// import CodePush from 'react-native-code-push'

import Login from './src/Components/Login'
import Main from './src/Components/Main'

import SignupTerms from './src/Components/signup/SignupTerms'
import Signup from './src/Components/signup/Signup'
import SignupResult from './src/Components/signup/SignupResult'

import NoticeDetail from './src/Components/notice/NoticeDetail'

import UploadSuggestion from './src/Components/suggestion/UploadSuggestion'
import SuggestionDetail from './src/Components/suggestion/SuggestionDetail'

import WorkReportDetail from './src/Components/workreport/WorkReportDetail'
import UploadWorkReport from './src/Components/workreport/UploadWorkReport'
import DrawSign from './src/Components/workreport/DrawSign'
import Setting from './src/Components/profile/Setting'
import ModifyProfile from './src/Components/profile/ModifyProfile'
import ModifyPassword from './src/Components/profile/ModifyPassword'
import DeleteUser from './src/Components/profile/DeleteUser'
import Pushnotification from './src/Components/Pushnotification'
import AsyncStorage from '@react-native-async-storage/async-storage'

// axios.defaults.baseURL = SERVER_ADDRESS
if(Platform.OS === 'android'){
    axios.defaults.baseURL = 'http://10.0.2.02:1234'
}else{
    axios.defaults.baseURL = 'http://localhost:1234'
}
axios.defaults.withCredentials = true // 토큰 인증 활성화

const Stack = createNativeStackNavigator()

const App = () => {

    // axios.interceptors.request.use(
    //     // 쿠키를 이용하여 모든 헤더에 추가해줌
    //     config => {
    //         if(Platform.OS === 'ios'){
    //             AsyncStorage.getItem('token', (err, data) => {
    //                 console.log(data)
    //                 config.headers['Authorization'] = data
    //                 return config;
    //             })
    //             }
    //         }
    //         // error => {
    //         //     return Promise.reject(error);
    //         // }
    //     )
    

    
        
    

    useEffect(() => {
        // requestUserPermission()
        setTimeout(() => {
            SplashScreen.hide()
        }, 2000)


    }, [])

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
            });
        return unsubscribe;
    }, [])

  return (
    <RecoilRoot>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Main" component={Main}/>

                <Stack.Screen name="Setting" component={Setting}/>
                <Stack.Screen name="ModifyProfile" component={ModifyProfile}/>
                <Stack.Screen name="ModifyPassword" component={ModifyPassword}/>
                <Stack.Screen name="DeleteUser" component={DeleteUser}/>

                <Stack.Screen name="SignupTerms" component={SignupTerms}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="SignupResult" component={SignupResult}/>
                
                <Stack.Screen name="NoticeDetail" component={NoticeDetail}/>

                <Stack.Screen name="UploadSuggestion" component={UploadSuggestion}/>
                <Stack.Screen name="SuggestionDetail" component={SuggestionDetail}/>

                <Stack.Screen name="UploadWorkReport" component={UploadWorkReport}/>
                <Stack.Screen name="WorkReportDetail" component={WorkReportDetail}/>

                <Stack.Screen name="Pushnotification" component={Pushnotification}/>


                    </Stack.Group>
                    <Stack.Group screenOptions={{headerShown: false, presentation: 'modal'}}>
                        <Stack.Screen name="DrawSign" component={DrawSign}/>
                    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    </RecoilRoot>
  )
}

export default App