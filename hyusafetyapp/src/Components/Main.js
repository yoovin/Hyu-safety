import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Navi from './Navi'
import Home from './Home'
import Notice from './notice/Notice'
import WorkReport from './workreport/WorkReport'
import Profile from './profile/Profile'

import styles from '../../styles'
import { currentUserid, currentUserInfo } from './recoil/atom'
import Suggestion from './suggestion/Suggestion'
import axios from 'axios'

/*
===== TODO =====
ㅇ. 안드로이드 나가시겠습니까 만들기
*/

const Main = ({navigation, route}) => {
    const [currentComponent, setCurrentComponent] = useState('Home')
    const [currentTitle, setCurrentTitle] = useState('홈')
    const [doubleBackToExitPressedOnce, setDoubleBackToExitPressedOnce] = useState(false)
    const userid = useRecoilValue(currentUserid)
    const setUserInfo = useSetRecoilState(currentUserInfo)

    useEffect(() => {
        console.log(route.params.id)
        axios.get('/login/getuserinfo', { params: {
            id: route.params.id
        }})
        .then(res => {
            setUserInfo(res.data)
            console.log(res.data)
        })

        const backAction = () => {
            if (doubleBackToExitPressedOnce) { // 만약 이전에 두번 눌렸다면
            BackHandler.exitApp() // 앱 종료
            return true
            }
    
            setDoubleBackToExitPressedOnce(true)
            setTimeout(() => {
                setDoubleBackToExitPressedOnce(false)
            }, 2000); // 2초 이내에 다시 눌러야 함
    
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        return () => backHandler.remove() // cleanup
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
            icon: <Ionicons name="megaphone-outline" size={30} color='white'></Ionicons>,
            selectIcon:<Ionicons name="megaphone" size={35} color='white'></Ionicons>,
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
            icon: <Ionicons name="hammer-outline" size={30} color='white'></Ionicons>,
            selectIcon: <Ionicons name="hammer" size={35} color='white'></Ionicons>,
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

    // const right = <TouchableOpacity style={{}}>
    //     <Ionicons name="notifications-outline" size={30} color='white'></Ionicons>
    //     <View style={styles.notificationNumCircle}> 
    //         <Text style={styles.notificationNum}>7</Text>
    //     </View>
    // </TouchableOpacity>

    return (
        <View style={{flex: 1}}>
            <Navi title={currentTitle}/>
            <View style={{flex: 1}}>
                {components[currentComponent]}
            </View>


            {/* FOOTER */}
            <View style={styles.footer}>
                    {menus.map(item => (
                        item.component == currentComponent ?
                        <View style={[styles.menuItem, {
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