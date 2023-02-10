import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions, ActivityIndicator, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {SERVER_ADDRESS} from '@env'

import Navi from '../Navi'
import styles from '../../../styles'
import axios from 'axios'

const WorkReportDetail = ({navigation, route}) => {
    const [content, setContent] = useState('')
    const [desc, setDesc] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const { width, height } = useWindowDimensions();

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=>{
        navigation.pop()
        route.params.refreshSuggestion()
    }}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const dateToString = (date) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    const deleteSuggestion = () => {
        Alert.alert("건의를 삭제하시겠습니까?",
        "",
        [{
            text:"아니요",
            onPress: () => {

            },
            style: "cancel"
        },
        {
            text:"예",
            onPress: () => {
                setIsUploading(true)
                axios.post('/suggestion/delete', {
                    index: content.index,
                    deleted: true
                })
                .then(res => {
                    if(res.status == 200){
                        navigation.pop()
                    }
                })
            }
        }]
            )
    }

    useEffect(() => {
        setContent(route.params)
        console.log(route.params)
        // 공지 내용 부르기
        axios.get('/suggestion/detail', {params: {index: route.params.index}})
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
                    {/* <Text style={styles.noticeTitle}></Text> */}
                    <Text style={styles.noticeContent}>건의 번호: {content.index}</Text>
                    <Text style={styles.noticeContent}>작성시각: {dateToString(content.upload_date.toString())}</Text>
                    <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={deleteSuggestion}>
                        <Text style={[styles.mainFont, styles.textBase, {color: 'red'}]}>삭제</Text>
                    </TouchableOpacity>
                    <ScrollView style={{width: '100%', height:'80%', marginVertical: '5%'}}>
                        {desc ?
                        <View>
                            <Text>
                                {desc.desc}
                            </Text>
                            <View style={{}}>
                                {desc.images.map(item => (
                                    <Image 
                                        source={{uri: `${SERVER_ADDRESS + item}`}}
                                        style={{width: width, height: height/3, marginVertical: 10}}
                                        resizeMode='contain'
                                    />
                                ))}
                            </View>
                        </View>:
                        <View>
                            <ActivityIndicator/>
                        </View>}
                    </ScrollView>
                </View>
            :<View>
                <ActivityIndicator/>
            </View>}
            {isUploading && [<View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray', opacity: 0.5}}></View>,
                <View style={{position: 'absolute',top: '37.5%', left:'25%', width: '50%', height: '25%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', opacity: 1}}>
                    <Text style={[styles.mainFont, styles.textXl, {marginVertical: '20%'}]}>삭제중</Text>
                    <ActivityIndicator size="large"/>
                </View>]}
        </View>
    )
}

export default WorkReportDetail