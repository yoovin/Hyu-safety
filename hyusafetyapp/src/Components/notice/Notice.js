import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from '../../../styles'
import axios from 'axios'

const Notice = ({navigation}) => {
    const [notices, setNotices] = useState([])
    const [noticeCount, setNoticeCount] = useState(0)
    const [curpage, setCurpage] = useState(1)
    const [loading, setLoading] = useState(false)

    const onClickDetail = (item) => {
        navigation.navigate('NoticeDetail', item)
    }

    const dateToString = (date) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    const renderNotice = ({item}) => (
            <TouchableOpacity 
            style={styles.noticeContainer}
            activeOpacity={0.8}
            onPress={() => onClickDetail(item)}>
                <Text style={styles.noticeTitle}>{item.index} | {item.title}</Text>
                {/* <Text style={styles.noticeContent} numberOfLines={1} ellipsizeMode="tail">{item.content}</Text> */}
                <Text style={styles.noticeDate}>{dateToString(item.upload_date.toString())} | {item.author} | {item.subject}</Text>
            </TouchableOpacity>
        )

    const getNotice = () => {
        setLoading(true)
        axios.get('/notice', {params:{
            uploaded: true,
            reverse: '-1',
            page:curpage
        }})
        .then(res => {
            setNotices(val => [...val, ...res.data.notices])
            setNoticeCount(res.data.count)
            setLoading(false)
        })
        .then(() => {
            console.log(notices[0])
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
            <FlatList style={{width: '100%', height:'100%'}}
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
        </View>
    )
}

export default Notice