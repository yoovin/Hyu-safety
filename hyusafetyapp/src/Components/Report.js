import { View, Text, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRecoilValue } from 'recoil';

import { currentUserid } from './recoil/atom'
import styles from '../../styles'

/*
===== TODOS =====
react-native-gifted-chat
*/

const dummyChat = [
    {name:'aa', text:'안녕'},
    {name:'aa', text:'이상은 것은 인생을 이것이다. 그것을 바이며, 이 인생에 같이, 발휘하기 것이다. 오직 무한한 고행을 군영과 오아이스도 꽃이 되려니와, 위하여, 뿐이다. 그들은 그들의 이성은 과실이 산야에 길지 같이, 영락과 아니다. 심장은 있는 꽃 얼마나 돋고, 있다. 할지니, 인생을 열락의 없는 없으면, 싶이 아니다. 이상, 새가 그들은 그들의 주며, 심장은 뿐이다. 있는 지혜는 위하여 노래하며 없으면 오직 모래뿐일 것이다. 품고 자신과 생의 듣는다.'},
    {name:'yoo', text:'안녕'},
    {name:'aa', text:'안녕히히히'},
    {name:'yoo', text:'안녕glglglgl하하하하'},
    {name:'aa', text:'안녕'},
]

const WorkReport = () => {
    // const windowHeight = Dimensions.get('window').height;
    const userid = useRecoilValue(currentUserid)


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{}} behavior='padding' keyboardVerticalOffset={85}>
                <ScrollView style={styles.chatView}>
                    <View>
                        <Text>기본인포</Text>
                    </View>
                    {dummyChat.map(item => (
                        <View style={[{width: '100%', height: '20%', marginVertical: 3}, userid == item.name && {flexDirection: 'row-reverse', }]}>
                            <View style={[userid == item.name ? styles.myChat : styles.otherChat, {width: `${item.text.length < 10 ? 30 : item.text.length > 20 ? 60 : item.text.length * 3}%`,  marginHorizontal: '5%'}]}>
                                <Text>{item.name}</Text>
                                <View style={{width: '30%', borderBottomWidth: 1, borderBottomColor: 'gray'}}></View>
                                <Text numberOfLines={2} style={{flexShrink: 1}}>{item.text}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.inputChatView}>
                    <TouchableOpacity  style={styles.inputChatButton}>
                    <Text style={styles.noticeDate}>+</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.inputChat} multiline={true}/>
                    <TouchableOpacity style={styles.inputChatButton}>
                        <Text style={styles.noticeDate}>보내기</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default WorkReport