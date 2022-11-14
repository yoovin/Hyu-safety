import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Navi from './Navi'
import styles from '../../styles'

const NoticeContent = ({navigation, route}) => {
    const [content, setContent] = useState('')

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>navigation.pop()}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    useEffect(() => {
        setContent(route.params)
        console.log(route.params)
    }, [])

    return (
        <View style={{flex:1}}>
            <Navi left={left}/>
            {content?
                <View style={{padding:'5%'}}>
                    <Text style={styles.noticeTitle}>{content.title}</Text>
                    <Text style={styles.noticeContent}>{content.date} | {content.team} | {content.subject}</Text>
                    <ScrollView style={{width: '100%', height:'80%', marginVertical: '5%'}}>
                        <Text style={styles.content}>{content.content}</Text>
                    </ScrollView>
                </View>
            :<Text>불러오는중</Text>}
        </View>
    )
}

export default NoticeContent