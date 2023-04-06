import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import RenderHtml from 'react-native-render-html';

import Navi from '../Navi'
import styles from '../../../styles'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoticeDetail = ({navigation, route}) => {
    const [content, setContent] = useState('')
    const [desc, setDesc] = useState('')
    const { width } = useWindowDimensions();

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>navigation.pop()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const dateToString = (date) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    /**
     * 공지 내용 부르기
     */
    const getNoticeDetail = async () => {
        let token = await AsyncStorage.getItem('token')
        const option = {params: {index: route.params.index}}
        if(Platform.OS === 'ios'){
            // ios에서 get 요청 시 header가 누락되어버리는 문제로 인해 query로 넣어줌
            option.params['Authorization'] = token
        }
        axios.get('/notice/detail', option)
        .then(res => {
            setDesc(res.data.desc)
            console.log(desc)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        setContent(route.params)
        getNoticeDetail()
    }, [])

    return (
        <View style={{flex:1}}>
            <Navi left={left}/>
            {content?
                <View style={{padding:'5%'}}>
                    <Text style={styles.noticeTitle}>{content.title}</Text>
                    <Text style={styles.noticeContent}>글 번호: {content.index} | 분류: {content.subject} | 글쓴이: {content.author}</Text>
                    <Text style={styles.noticeContent}>작성시각: {dateToString(content.upload_date.toString())}</Text>
                    <ScrollView style={{width: '100%', height:'80%', marginVertical: '5%'}}>
                        {desc ?
                        <RenderHtml
                        contentWidth={width}
                        source={{html:desc}}
                        />:
                        <View>
                            <ActivityIndicator/>
                        </View>}
                    </ScrollView>
                </View>
            :<View>
                <ActivityIndicator/>
            </View>}
        </View>
    )
}

export default NoticeDetail