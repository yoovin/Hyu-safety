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
import NoticeContent from './src/Components/notice/NoticeContent'
import SignupTerms from './src/Components/signup/SignupTerms'
import Signup from './src/Components/signup/Signup'
import SignupResult from './src/Components/signup/SignupResult'

axios.defaults.baseURL = SERVER_ADDRESS


const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <RecoilRoot>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignupTerms" component={SignupTerms}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="SignupResult" component={SignupResult}/>
                <Stack.Screen name="Main" component={Main}/>
                <Stack.Screen name="NoticeContent" component={NoticeContent}/>
                    </Stack.Group>
                    <Stack.Group screenOptions={{headerShown: false, presentation: 'modal'}}>
                    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    </RecoilRoot>
  )
}

export default App