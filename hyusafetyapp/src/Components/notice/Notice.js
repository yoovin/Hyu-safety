import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from '../../../styles'
import axios from 'axios'

const Notice = ({navigation}) => {
    const [notices, setNotices] = useState([])
    const [noticeCount, setNoticeCount] = useState(0)
    const [curpage, setCurpage] = useState(1)
    const [loading, setLoading] = useState(false)

    const onClickContent = (item) => {
        navigation.navigate('NoticeContent', item)
    }

    const leftPad = (value) => {
        if (value >= 10) {
            return value;
        }
        return `0${value}`;
    }

    const toStringByFormatting = (source, delimiter = '-') => {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
    
        return [year, month, day].join(delimiter);
    }

    const onDragEnd = () => {
        console.log("끄ㅌ에 닿ㅡ")
    }

    const renderNotice = ({item}) => (
            <TouchableOpacity 
            style={styles.noticeContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NoticeContent', item)}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                {/* <Text style={styles.noticeContent} numberOfLines={1} ellipsizeMode="tail">{item.content}</Text> */}
                <Text style={styles.noticeDate}>{item.upload_date && item.upload_date} | {item.author} | {item.subject}</Text>
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

    // useEffect(()=>{
    //     // 공지 불러오기
    //     getNotice()
    // }, [])

    useEffect(() => {
        if(curpage == 1){
            setNotices([])
        }
        getNotice()
    }, [curpage])


    // console.log(notices)

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