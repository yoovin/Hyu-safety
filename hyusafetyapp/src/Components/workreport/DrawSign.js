import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Signature from "react-native-signature-canvas"
import Toast from 'react-native-toast-message'

import styles from '../../../styles';

const DrawSign = ({navigation, route}) => {
    return (
        <View style={{flex: 1}}>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
                <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
                    <TouchableOpacity
                    onPress={() => {
                        navigation.pop()
                    }}>
                        <Text style={[styles.mainFont, styles.textXl, {color: 'red'}]}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Signature
                // handle when you click save button
                onOK={(img) => {
                    // console.log(img)
                    route.params.setSign(img)
                    navigation.pop()
                }}
                dataURL={route.params.sign}
                onEmpty={() => {
                    Toast.show({
                        type: 'error',
                        text1: '서명이 비어있습니다.',
                        onPress: () => {
                            Toast.hide()
                        }
                    })
                }}
                // description text for signature
                descriptionText="서명"
                // clear button text
                clearText="지우기"
                // save button text
                confirmText="완료"
                webStyle={`.m-signature-pad--footer
                    .button {
                    background-color: #91a4ff;
                    color: #FFF;
                    }`}
                autoClear={true}
                imageType={"image/png"}
                />
                <Toast
                    position='bottom'
                    bottomOffset={20}
                />
        </View>
    )
}

export default DrawSign