import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { currentUserInfo } from './recoil/atom'

import styles from '../../styles'
import axios from 'axios'

import { useRecoilValue } from 'recoil'

const Pushnotification = ({navigation}) => {
    const [notices, setNotices] = useState([])
    const [noticeCount, setNoticeCount] = useState(0)
    const [curpage, setCurpage] = useState(1)
    const [loading, setLoading] = useState(false)
    const userInfo = useRecoilValue(currentUserInfo)

    const onClickDetail = (item) => {
        // navigation.navigate('NoticeDetail', item)
    }

    const dateToString = (date) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    const renderNotice = ({item}) => (
            <TouchableOpacity 
            style={styles.noticeContainer}
            activeOpacity={0.8}
            onPress={() => onClickDetail(item)}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Text style={styles.noticeContent} numberOfLines={1} ellipsizeMode="tail">{item.desc}</Text>
                <Text style={styles.noticeDate}>{dateToString(item.upload_date.toString())}</Text>
            </TouchableOpacity>
        )

    const getNotice = () => {
        setLoading(true)
        axios.get('/pushnotification/getpushs', {params:{
            id: {$in:userInfo.id},
            reverse: '-1',
            page:curpage
        }})
        .then(res => {
            setNotices(val => [...val, ...res.data.pushs])
            setNoticeCount(res.data.count)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        if(curpage == 1){
            setNotices([])
        }
        getNotice()
    }, [curpage])

    return (
        <View>
            {noticeCount > 0
            ? <FlatList style={{width: '100%', height:'100%'}}
            data={notices}
            renderItem={renderNotice}
            onEndReached={() => {
                if(notices.length < noticeCount){ // 더 불러올게 없음
                    setCurpage(val => val+1)
                }
            }}
            ListFooterComponent={loading && <ActivityIndicator/>}
            onRefresh={() => {
                setCurpage(1)
            }}
            refreshing={false}
            >
                
            </FlatList>
            : <Text style={[styles.noticeTitle, {margin: 10}]}>받은 알림이 없습니다.</Text>}
            
        </View>
    )
}

export default Pushnotification