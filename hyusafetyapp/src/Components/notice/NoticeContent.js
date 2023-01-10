import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import {SERVER_ADDRESS} from '@env'
import RenderHtml from 'react-native-render-html';

import Navi from '../Navi'
import styles from '../../../styles'
import axios from 'axios'

const NoticeContent = ({navigation, route}) => {
    const [content, setContent] = useState('')
    const [desc, setDesc] = useState('')
    const { width } = useWindowDimensions();

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>navigation.pop()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    useEffect(() => {
        setContent(route.params)
        // 공지 내용 부르기
        axios.get(SERVER_ADDRESS + '/notice/detail', {params: {index: route.params.index}})
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
                    <Text style={styles.noticeContent}>{content.date} | {content.team} | {content.subject}</Text>
                    <ScrollView style={{width: '100%', height:'80%', marginVertical: '5%'}}>
                        <RenderHtml
                            contentWidth={width}
                            source={{html:desc}}
                        />
                    </ScrollView>
                    
                        {/* {desc ?
                        // <Text>{desc}</Text>
                        // :
                        <RenderHtml
                        contentWidth={width}
                        source={{html:desc}}
                        />:
                        <Text>불러오는중</Text>} */}
                </View>
            :<Text>불러오는중</Text>}
        </View>
    )
}

export default NoticeContent