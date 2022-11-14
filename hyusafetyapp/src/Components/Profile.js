import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import styles from '../../styles'

// 

const Info = () => {
    useEffect(()=>{
        
    }, [])
    return (
        <View style={{flex:1}}>
            <View style={{padding: '10%', flex:1}}>
                <View style={{paddingHorizontal: '20%', alignItems: 'center'}}>
                    <Ionicons name="person-circle-outline" size={200} color="black"></Ionicons>
                    <Text style={styles.item}>심유빈</Text>
                </View>
            </View>
            <View style={{flex:1.5, flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Ionicons name="man-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                    <Ionicons name="mail-outline" size={40} style={{marginTop: 15}} color='#91a4ff'></Ionicons>
                </View>
                <View style={{flex:3}}>
                    <Text style={styles.itemText}>Manager</Text>
                    <Text style={styles.itemText}>soo22839@gmail.com</Text>
                </View>
            </View>
        </View>
    )
}

export default Info