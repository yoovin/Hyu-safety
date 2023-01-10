import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from '../../styles'

const Suggestion = () => {



    return (
        <View>
            <View>
                <Text>내가 올린 건의</Text>
                <TouchableOpacity
                onPress={() => null}>
                    <Text>+ 새 건의 쓰기</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{width: '100%', height:'100%'}}>
                {/* {notices? notices.map(item => (
                    <TouchableOpacity 
                    style={styles.noticeContainer}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('NoticeContent', item)}>
                        <Text style={styles.noticeTitle}>{item.title}</Text>
                        <Text style={styles.noticeContent} numberOfLines={1} ellipsizeMode="tail">{item.content}</Text>
                        <Text style={styles.noticeDate}>{item.date} | {item.team} | {item.subject}</Text>
                    </TouchableOpacity>
                    ))
                :<Text>'불러오는 중'</Text>} */}
            </ScrollView>
        </View>
    )
}

export default Suggestion