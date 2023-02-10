import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput } from 'react-native-gesture-handler';


import styles from '../../../../styles';

/*
===== TODOS =====
1. 이거 체크리스트 변경이 안되는 버그가있는데 수정해야댐,, 아마 state문제로 예상됨
2.
3. 
*/

const WorkChecklist = ({setCanPressNextButton, content, checkWorkChecklist, idx}) => {
    const [info, setInfo] = useState(content)
    const [checklists, setChecklists] = useState(content.checklist)
    const [constructorHasRun, setConstructorHasRun] = useState(false)

    const constructor = async() =>{
        if(constructorHasRun) return

        /* Constructor 본문 */
        console.log("실행댐")

        setConstructorHasRun(true)
    }
    constructor()

    useEffect(() => {
        // console.log(info)
        console.log(checklists)
    }, [])

    useEffect(() => {
        setChecklists(content.checklist)
    }, [idx])

    useEffect(() => {
        for(let i = 0; i < checklists.length; i++){
            if(!checklists[i].checked && !checklists[i].reason){
                setCanPressNextButton(false)
                return
            }
        }
        // 여기에 다한거
        // checkWorkChecklist(idx, checklists)
        setCanPressNextButton(true)
    }, [checklists])

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{alignItems: 'center'}}>
                <Text style={[styles.textXl, styles.mainFont, {marginVertical: 10}]}>{content.title}작업 안전조치 사항</Text>
            </View>
            <KeyboardAwareScrollView contentContainerStyle={{paddingHorizontal: 20}}>
                {checklists && checklists.map((item, idx) => (
                    <View style={{marginBottom: 30}}>
                        <View style={styles.questionView}>
                            <Text style={[styles.textLg, styles.mainFont, {marginHorizontal: 10}]}>{idx+1}. {item.question}</Text>
                            <View style={[{flexDirection: 'row'}]}>
                                <TouchableOpacity style={{marginHorizontal: 5}}
                                onPress={() => {
                                    setChecklists(li => {
                                        const cur = [...li]
                                        cur[idx]['checked'] = true
                                        return cur
                                    })
                                }}>
                                    <Text style={[styles.text2xl, styles.mainFont, item.checked ? {color: 'green'} : {color: 'gray'}]}>O</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginHorizontal: 5}}
                                onPress={() => {
                                    setChecklists(li => {
                                        const cur = [...li]
                                        cur[idx]['checked'] = false
                                        return cur
                                    })
                                }}>
                                <Text style={[styles.text2xl, styles.mainFont, item.checked ? {color: 'gray'} : {color: 'red'}]}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {!item.checked &&
                        <View style={[styles.questionView, {justifyContent:'flex-start'}]}>
                            <Text style={[styles.mainFont, styles.textLg, {marginHorizontal: 10}]}>  이행 불가 사유:</Text>
                            <TextInput
                            style={[styles.workInput, {width: '60%', textAlign: 'center'}]}
                            value={item.reason}
                            onChangeText={text => {
                                setChecklists(li => {
                                    const cur = [...li]
                                    cur[idx]['reason'] = text
                                    return cur
                                })
                            }}/>
                        </View>}
                    </View>
                ))}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default WorkChecklist