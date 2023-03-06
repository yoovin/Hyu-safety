import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import RenderHtml from 'react-native-render-html';

import Navi from '../Navi'
import styles from '../../../styles'
import axios from 'axios'

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

    useEffect(() => {
        setContent(route.params)
        console.log(route.params)
        // 공지 내용 부르기
        axios.get('/notice/detail', {params: {index: route.params.index}})
        .then(res => {
            setDesc(res.data.desc)
            console.log(desc)
        })
        .catch(err => console.error(err))
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