import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { currentUserInfo } from '../recoil/atom'

import styles from '../../../styles'
import axios from 'axios'
import { useRecoilValue } from 'recoil'

/*
===== TODO =====
1. 2페이지에 있는게 맨 위로 나오는 버그가 있는데,, 이유는 대충 알거같은데,, 해결을,, 몰겠다,,
*/

const WorkReport = ({navigation}) => {
    const [suggestions, setSuggestions] = useState([])
    const [suggestionCount, setSuggestionCount] = useState(0)
    const [curpage, setCurpage] = useState(1)
    const [loading, setLoading] = useState(false)
    const userInfo = useRecoilValue(currentUserInfo)
    const isFocused = useIsFocused()
    

    const onClickContent = (item) => {
        navigation.navigate('WorkReportDetail', {...item, refreshSuggestion: refreshSuggestion})
    }

    const dateToString = (date) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    const renderSuggestion = ({item}) => (
            <TouchableOpacity 
            style={styles.noticeContainer}
            activeOpacity={0.8}
            onPress={() => onClickContent(item)}
            key={item.index}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.noticeTitle]}>{item.index}번 작업신고 | {
                        item.condition == 'waited' && <Text style={{color: 'orange'}}>승인 대기</Text> ||
                        item.condition == 'approval' && <Text style={{color: 'green'}}>승인 완료</Text> ||
                        item.condition == 'refused' && <Text style={{color: 'red'}}>승인 거부</Text>
                    }</Text>
                </View>
                <Text style={styles.noticeDate}>{dateToString(item.upload_date.toString())}</Text>
            </TouchableOpacity>
        )
    const refreshSuggestion = () => {
        setSuggestions([])
        getSuggestion()
        if(curpage > 1) setCurpage(1)
    }

    const getSuggestion = () => {
        setLoading(true)
        axios.get('/workreport', {params:{
            reverse: '-1',
            page:curpage,
            deleted: false,
            deleted: false,
        }})
        .then(res => {
            setSuggestions(val => [...val, ...res.data.workreports])
            setSuggestionCount(res.data.count)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        if(curpage > 1){
            // setSuggestions([])
        }
        getSuggestion()
    }, [curpage])

    return (
        <View>
            <View style={[styles.noticeContainer, {flexDirection: 'row',width: '100%', padding: '2%', borderBottomColor: '#91a4ff'}]}>
            <Text style={[styles.noticeTitle, {marginHorizontal: 10}]}>안전 작업 신고내역 ({suggestionCount}개</Text>
            <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity
                onPress={() => navigation.push('UploadWorkReport', {refreshSuggestion: refreshSuggestion})}>
                    <Text style={[styles.mainFont, styles.textLg, {color: 'cornflowerblue'}]}>+ 새 작업</Text>
                </TouchableOpacity> 
            </View>  
            </View>
            <View>
                {suggestionCount > 0? <FlatList style={{width: '100%', height:'94%'}}
                data={suggestions}
                renderItem={renderSuggestion}
                onEndReached={() => {
                    if(suggestions.length < suggestionCount && curpage * 10 < suggestionCount){ // 더 불러올게 없음
                        console.log(suggestions.length)
                        setCurpage(val => val+1)
                    }
                }}
                keyExtractor={(item, index) => item.key}
                ListFooterComponent={loading && <ActivityIndicator/>}
                onRefresh={refreshSuggestion}
                refreshing={false}
                >
            </FlatList>:
            <Text style={[styles.noticeTitle, {margin: 10}]}>아직 올린 작업신고가 없습니다.</Text>}
        </View>
        </View>
    )
}

export default WorkReport