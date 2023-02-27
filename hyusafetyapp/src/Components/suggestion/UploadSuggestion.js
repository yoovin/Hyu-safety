import { 
    View, 
    Text, 
    SafeAreaView,
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    Dimensions,
    Image,
    ActivityIndicator,
    Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Dialog from "react-native-dialog"
import { useRecoilValue } from 'recoil'
import { currentUserInfo } from '../recoil/atom'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'

import validate from '../Hooks/suggestionValicate'
import Navi from '../Navi'
import styles from '../../../styles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'



/*
===== TODOS =====
1. 사진 업로드
*/

const WriteSuggestion = ({navigation, route}) => {
    const [isGoBack, setIsGoBack] = useState(false)
    const [isUpload, setIsUpload] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const userInfo = useRecoilValue(currentUserInfo)
    const [desc, setDesc] = useState('')
    const [photos, setPhotos] = useState([])

    const windowHeight = Dimensions.get('window').height
    const windowWidth = Dimensions.get('window').width

    const left = <TouchableOpacity
    activeOpacity={0.8}
    onPress={()=> {
        setIsGoBack(true)
    }}
    >
        <Text style={styles.backButtonText}>{'   <'}</Text>
    </TouchableOpacity>

    const right = <TouchableOpacity
    activeOpacity={0.8}
    style={{alignItems: 'center'}}
    onPress={()=> {
        setIsUpload(true)
    }}
    >
        <FontAwesome name="send-o" size={25} color='white'></FontAwesome>
    </TouchableOpacity>

    const handleSubmit = async() => {
        setIsUpload(false)
        setIsUploading(true)
        const formData = new FormData()
        formData.append('id', userInfo.id)
        formData.append('desc', desc)
        photos.map(item => {
            formData.append('file', item)
        })
        axios.post('/suggestion/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => {
            console.log(res.status)
            setIsUploading(false)
            Alert.alert("업로드 되었습니다.","", [
            {   text:"확인",
                onPress: () => {
                navigation.pop()
                route.params.refreshSuggestion()
            }}])
        })
        .catch(err => {
            setIsUploading(false)
            Alert.alert("에러가 발생했습니다.", err)
            console.error(err.request._response)
            if(err.request.status == 412){ // 내가 준 애러
                const errorJson = JSON.parse(err.request._response)
                console.log(errorJson.text)
            }
        })
    }

    const uploadPhoto = () => {
        Alert.alert(
            "사진 업로드",
            "",
            [{
                text: "사진 찍기",
                onPress: () => {
                    launchCamera({mediaType: 'photo'}, res => {
                        setPhotos(photo => [...photo, res.assets[0]])
                        console.log(res);
                    })
                }
            },
            {
                text: "앨범에서 선택",
                onPress: () => {
                    launchImageLibrary({mediaType: 'photo'}, res => {
                        if(res.didCancel){
                            console.log('User cancelled image picker');
                        }else{
                            setPhotos(photo => [...photo,
                                {
                                uri: Platform.OS === 'android' ? res.assets[0].uri : res.assets[0].uri.replace('file://', ''),
                                type: res.assets[0].type,
                                name: res.assets[0].fileName,
                            }])
                            console.log(res);
                        }
                    })
                }
            },
            {
                text: "취소",
                onPress: () => {

                }
            },]
        )
    }

    const onRemovePhoto = uri => {
        setPhotos(photos.filter(photo => photo !== uri))
    }

    useEffect(() => {
        console.log(userInfo)
    }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
        {/* <KeyboardAvoidingView style={{flex: 1}} behavior='height' keyboardVerticalOffset={10}> */}
            <Navi left={left} title="건의쓰기" right={right}/>
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1, padding: 15, height: '100%'}}>
                    <View style={{flex: 0.1, flexDirection: 'row', marginBottom: 20}}>
                        <Text style={[styles.textLg, styles.mainFont]}>신고자</Text>
                        <View style={styles.infoHr}>
                            <Text style={[{marginHorizontal: 10}, styles.mainFont]}>{userInfo.name}</Text>
                        </View>
                    </View>

                    <View style={{flex: 0.1, flexDirection: 'row', marginBottom: 20}}>
                        <Text style={[styles.textLg, styles.mainFont]}>연락처</Text>
                        <View style={styles.infoHr}>
                            <Text style={[{marginHorizontal: 10}, styles.mainFont]}>{userInfo.phone}</Text>
                        </View>
                    </View>

                    <View style={{flex: 2, marginBottom: 20}}>
                        <Text style={[styles.textLg, styles.mainFont, {marginBottom: 10}]}>건의내용</Text>
                        <TextInput
                            style={{height: '90%', padding: 10, borderColor: 'black', borderWidth: 2, borderRadius: 10}}
                            multiline={true}
                            numberOfLines={10}
                            name="desc"
                            onChangeText={setDesc}
                            />
                    </View>

                    <View style={{flex: 0.5, marginBottom: 20}}>
                        <Text style={[styles.textLg, styles.mainFont, {marginBottom: 10}]}>사진 ({photos.length}/5)</Text>
                        <ScrollView style={{width: '100%', height: '100%'}}
                        
                        horizontal={true}
                        scrollToOverflowEnabled={true}>
                            <TouchableOpacity style={[styles.uploadImageSkeleton, {width: windowWidth / 4, height: windowHeight / 11,}]}
                            activeOpacity={0.8}
                            onPress={uploadPhoto}>
                                <Text style={[styles.textBase, styles.mainFont, { color: 'white' }]}>사진</Text>
                                <Ionicons name="camera-outline" size={30} color='white'></Ionicons>
                            </TouchableOpacity>

                            {photos.map((item) => (
                                [
                                <TouchableOpacity style={[styles.uploadImageSkeleton, {width: windowWidth / 4, height: windowHeight / 11}]}
                                activeOpacity={1}>
                                    <Image style={styles.uploadedImage} source={{uri: item.uri}}/>
                                    <TouchableOpacity style={[styles.imageRemoveButton, {borderRadius: windowWidth}]}
                                    activeOpacity={0.8}
                                    onPress={() => onRemovePhoto(item)}>
                                        <Text style={[{color: 'white'}, styles.mainFont]}>X</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>]
                            ))}
                        </ScrollView>
                    </View>

                </View>
                {isUploading && [<View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'gray', opacity: 0.5}}></View>,
                <View style={{position: 'absolute',top: '25%', left:'25%', width: '50%', height: '25%', borderRadius: 10, backgroundColor: 'white', alignItems: 'center', opacity: 1}}>
                    <Text style={[styles.mainFont, styles.textXl, {marginVertical: '20%'}]}>업로드 중</Text>
                    <ActivityIndicator size="large"/>
                </View>]}

                <Dialog.Container visible={isGoBack}>
                    <Dialog.Title>
                        나가시겠습니까?
                    </Dialog.Title>
                    <Dialog.Description>
                        쓰던 내용은 저장되지 않습니다!
                    </Dialog.Description>
                    <Dialog.Button label="아니오" onPress={()=>{
                        setIsGoBack(false)
                        }}></Dialog.Button>
                    <Dialog.Button label="예" onPress={() => {
                        navigation.pop()
                        route.params.refreshSuggestion()
                    }}></Dialog.Button>
                </Dialog.Container>

                <Dialog.Container visible={isUpload}>
                    <Dialog.Title>
                        건의를 올리시겠습니까?
                    </Dialog.Title>
                    {/* <Dialog.Description>
                        쓰던 내용은 저장되지 않습니다!
                    </Dialog.Description> */}
                    <Dialog.Button label="아니오" onPress={()=>{
                        setIsUpload(false)
                        }}></Dialog.Button>
                    <Dialog.Button label="예" onPress={() => {
                        handleSubmit()
                    }}></Dialog.Button>
                </Dialog.Container>
            </SafeAreaView>
        {/* </KeyboardAvoidingView> */}
        </View>
    </TouchableWithoutFeedback>
  )
}

export default WriteSuggestion