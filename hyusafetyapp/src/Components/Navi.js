import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import styles from '../../styles'

export default function Navi({left, title, right, titleOnPress}) {
    return (
        <View style={styles.navi}>
            <View style={styles.viewContainer}></View>
            <View style={styles.contentContainer}>
                <View style={styles.leftView}>
                    {left}
                </View>
                {titleOnPress ? 
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={titleOnPress}
                style={styles.titleView}>
                    <Text style={styles.titleText}>{title}</Text>
                </TouchableOpacity>
                :<View style={styles.titleView}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>}
                <View style={styles.rightView}>
                    {right}
                </View>
            </View>
        </View>
    )
}