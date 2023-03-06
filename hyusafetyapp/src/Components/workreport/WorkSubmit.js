import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox'

import styles from '../../../styles'

const WorkSubmit = ({setCanPressNextButton, content, img}) => {

    const [termChecked, setTermChecked] = useState(false)

    useEffect(() => {
        // console.log(content[4])
        console.log(img)
    }, [])

    useEffect(() => {
        if(termChecked){
            setCanPressNextButton(true)
        }else{
            setCanPressNextButton(false)
        }
    }, [termChecked])

    return (
        <View style={{flex: 1, alignContent: 'center'}}>
            <View style={{height: '50%', margin: '5%', marginTop: '20%', padding: '5%', justifyContent: 'center', alignItems:'flex-end', borderWidth: 2, borderColor: 'black', borderRadius: 5}}>
                <View>
                    <Text style={[styles.mainFont, styles.textXl, {marginLeft: 10, color: 'gray'}, termChecked && {color: 'black'}]}>상기 작성한 항목에 이상이 없음을 확인하였습니다.</Text>
                </View>
                <View>
                    <CheckBox
                    value={termChecked}
                    onValueChange={setTermChecked}
                    ></CheckBox>
                    <Image source={{uri: img}} style={{ width: 300, height: 300 }} />
                </View>
                
            </View>
        </View>
    )
}

export default WorkSubmit