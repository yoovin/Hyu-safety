import { View, Text, TouchableOpacity, useLayoutEffect } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Navi from './Navi'
import Home from './Home'
import Notice from './notice/Notice'
import WorkReport from './workreport/WorkReport'
import Profile from './Profile'

import styles from '../../styles'
import { currentUserid, currentUserInfo } from './recoil/atom'
import Suggestion from './suggestion/Suggestion'
import axios from 'axios'

/*
===== TODO =====
*/

const Main = ({navigation}) => {
    const [currentComponent, setCurrentComponent] = useState('Home')
    const [currentTitle, setCurrentTitle] = useState('홈')
    const userid = useRecoilValue(currentUserid)
    const setUserInfo = useSetRecoilState(currentUserInfo)

    useEffect(() => {
        console.log(userid)
        axios.get('/login/getuserinfo', { params: {
            id: userid
        }})
        .then(res => {
            setUserInfo(res.data)
            console.log(res.data)
        })
    }, [])

    const components = {
        Notice: <Notice navigation={navigation}/>,
        Home: <Home/>,
        WorkReport: <WorkReport navigation={navigation}/>,
        Suggestion: <Suggestion navigation={navigation}/>,
        Info: <Profile navigation={navigation}/>,
    }

    const menus = [
        {
            component: "Suggestion",
            icon: <Ionicons name="newspaper-outline" size={30} color='white'></Ionicons>,
            selectIcon: <Ionicons name="newspaper" size={35} color='white'></Ionicons>,
            menuName: "건의사항",
        },
        {
            component: "Notice",
            icon: <AntDesign name="notification" size={30} color='white'></AntDesign>,
            selectIcon:<AntDesign name="notification" size={35} color='white'></AntDesign>,
            menuName: "공지사항",
        },
        {
            component: "Home",
            icon: <Ionicons name="home-outline" size={30} color='white'></Ionicons>,
            selectIcon: <Ionicons name="home" size={35} color='white'></Ionicons>,
            menuName: "홈",
        },
        {
            component: "WorkReport",
            icon:<MaterialCommunityIcons name="hammer-wrench" size={30} color='white'></MaterialCommunityIcons>,
            selectIcon:<MaterialCommunityIcons name="hammer-wrench" size={35} color='white'></MaterialCommunityIcons>,
            menuName: "안전작업신고",
        },
        {
            component: "Info",
            icon: <Ionicons name="ios-person-outline" size={30} color='white'></Ionicons>,
            selectIcon: <Ionicons name="ios-person" size={35} color='white'></Ionicons>,
            menuName: "내정보",
        },
    ]

    const handleFooterMenu = (item) => {
        setCurrentComponent(item.component)
        setCurrentTitle(item.menuName)
    }

    const right = <TouchableOpacity>
        <Ionicons name="notifications-outline" size={30} color='white'></Ionicons>
        <View style={styles.notificationNumCircle}> 
            <Text style={styles.notificationNum}>7</Text>
        </View>
    </TouchableOpacity>

    return (
        <View style={{flex: 1}}>
            <Navi title={currentTitle} right={right}/>
            <View style={{flex: 1}}>
                {components[currentComponent]}
            </View>


            {/* FOOTER */}
            <View style={styles.footer}>
                    {menus.map(item => (
                        item.component == currentComponent ?
                        <View style={[styles.menuItem, {
                            // borderRadius: 30,
                            // backgroundColor:'#5d69a8'
                        }]}>
                            {item.selectIcon}
                            <Text style={styles.menuText}>{item.menuName}</Text>
                        </View>:

                        <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleFooterMenu(item)}>
                            {item.icon}
                            <Text style={styles.menuText}>{item.menuName}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    )
}

export default Main