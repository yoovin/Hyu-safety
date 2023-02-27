import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import axios from 'axios'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RecoilRoot } from 'recoil'
import {SERVER_ADDRESS} from '@env'
// import Toast from 'react-native-toast-message'
// import SplashScreen from 'react-native-splash-screen'
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

axios.defaults.baseURL = SERVER_ADDRESS


const Stack = createNativeStackNavigator()

const App = () => {
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

                <Stack.Screen name="SignupTerms" component={SignupTerms}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="SignupResult" component={SignupResult}/>
                
                <Stack.Screen name="NoticeDetail" component={NoticeDetail}/>

                <Stack.Screen name="UploadSuggestion" component={UploadSuggestion}/>
                <Stack.Screen name="SuggestionDetail" component={SuggestionDetail}/>

                <Stack.Screen name="UploadWorkReport" component={UploadWorkReport}/>
                <Stack.Screen name="WorkReportDetail" component={WorkReportDetail}/>


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