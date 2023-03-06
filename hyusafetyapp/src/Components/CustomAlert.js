import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../styles'

const CustomAlert = ({text}) => {
  return (
    <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray', opacity: 0.5}}></View>,
    <View style={{position: 'absolute',top: '25%', left:'25%', width: '50%', height: '25%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', opacity: 1}}>
        <Text style={[styles.mainFont, styles.textXl, {marginVertical: '20%'}]}>{text}</Text>
        <ActivityIndicator size="large"/>
    </View>
  )
}

export default CustomAlert