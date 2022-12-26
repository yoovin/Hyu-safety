import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    ImageBackground,
} from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

import styles from '../../styles'
import { ScrollView } from 'react-native';

/*
===== TODO =====
*/

const SignupTerms = ({navigation}) => {
    const [isAgree, setIsAgree] = useState(false)

    const handleInputId = () => {

    }
    const handleInputPw = () => {
        
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'#5471ff'}}>
            <View style={[styles.idInputView]}>
                <Text style={[styles.titleText, {color: 'black'}]}>약관동의</Text>
                <ScrollView style={styles.termsView}>
                    <Text>사랑의 뛰노는 그들의 가치를 들어 있을 불러 만물은 아름다우냐? 피가 꽃이 그들의 것이다. 방황하여도, 찾아 천자만홍이 있는 하여도 사랑의 보라. 생생하며, 긴지라 인생에 창공에 황금시대를 소담스러운 청춘의 고동을 힘있다. 충분히 속에서 예수는 같은 소금이라 풀이 끓는다. 실로 청춘을 이상의 있는 가장 무엇이 장식하는 힘있다. 얼음이 가슴에 충분히 밝은 실현에 원질이 있으랴? 황금시대의 할지라도 그것은 그리하였는가? 가치를 품에 가지에 설산에서 이것이다.

청춘이 구하지 바이며, 품고 끓는다. 뜨고, 무엇이 우리의 동력은 하는 석가는 가치를 것이다. 인간의 있는 천자만홍이 인생의 소금이라 이상 그리하였는가? 피어나기 것은 그들의 가치를 밥을 위하여서, 있으랴? 얼음이 곧 보이는 꽃이 우리 것이다. 이상이 수 천고에 굳세게 사랑의 끓는다. 그들에게 온갖 위하여, 사랑의 뜨고, 피고 얼마나 힘있다. 가는 두손을 것은 피고 동력은 열락의 것이 봄바람이다. 인도하겠다는 피고 든 주며, 이것이다. 피에 미인을 그들의 인생을 투명하되 노년에게서 운다. 못할 풀밭에 우리는 생의 트고, 힘차게 힘있다.

것이다.보라, 같이, 눈에 이것이다. 우리의 우리 천하를 그와 만물은 불어 가는 있는 힘차게 사막이다. 별과 위하여, 곳으로 투명하되 끝까지 뜨거운지라, 피어나는 듣는다. 청춘이 것이다.보라, 거친 인생에 원질이 청춘 반짝이는 교향악이다. 기쁘며, 전인 위하여, 이것을 가슴에 것이다. 열락의 있는 싶이 그들은 약동하다. 아니한 사랑의 가는 것은 원대하고, 청춘의 보는 커다란 위하여 이것이다. 이는 시들어 착목한는 인생에 따뜻한 내는 못할 원대하고, 이 것이다. 가장 피어나기 얼마나 용기가 곳이 이성은 대고, 가치를 위하여서. 밝은 날카로우나 속잎나고, 피고 그들은 인생에 청춘의 같은 것이다. 수 천고에 눈이 실로 황금시대를 이상을 보이는 봄바람이다.</Text>
                </ScrollView>
                <ScrollView style={styles.termsView}>
                    <Text>사랑의 뛰노는 그들의 가치를 들어 있을 불러 만물은 아름다우냐? 피가 꽃이 그들의 것이다. 방황하여도, 찾아 천자만홍이 있는 하여도 사랑의 보라. 생생하며, 긴지라 인생에 창공에 황금시대를 소담스러운 청춘의 고동을 힘있다. 충분히 속에서 예수는 같은 소금이라 풀이 끓는다. 실로 청춘을 이상의 있는 가장 무엇이 장식하는 힘있다. 얼음이 가슴에 충분히 밝은 실현에 원질이 있으랴? 황금시대의 할지라도 그것은 그리하였는가? 가치를 품에 가지에 설산에서 이것이다.

청춘이 구하지 바이며, 품고 끓는다. 뜨고, 무엇이 우리의 동력은 하는 석가는 가치를 것이다. 인간의 있는 천자만홍이 인생의 소금이라 이상 그리하였는가? 피어나기 것은 그들의 가치를 밥을 위하여서, 있으랴? 얼음이 곧 보이는 꽃이 우리 것이다. 이상이 수 천고에 굳세게 사랑의 끓는다. 그들에게 온갖 위하여, 사랑의 뜨고, 피고 얼마나 힘있다. 가는 두손을 것은 피고 동력은 열락의 것이 봄바람이다. 인도하겠다는 피고 든 주며, 이것이다. 피에 미인을 그들의 인생을 투명하되 노년에게서 운다. 못할 풀밭에 우리는 생의 트고, 힘차게 힘있다.

것이다.보라, 같이, 눈에 이것이다. 우리의 우리 천하를 그와 만물은 불어 가는 있는 힘차게 사막이다. 별과 위하여, 곳으로 투명하되 끝까지 뜨거운지라, 피어나는 듣는다. 청춘이 것이다.보라, 거친 인생에 원질이 청춘 반짝이는 교향악이다. 기쁘며, 전인 위하여, 이것을 가슴에 것이다. 열락의 있는 싶이 그들은 약동하다. 아니한 사랑의 가는 것은 원대하고, 청춘의 보는 커다란 위하여 이것이다. 이는 시들어 착목한는 인생에 따뜻한 내는 못할 원대하고, 이 것이다. 가장 피어나기 얼마나 용기가 곳이 이성은 대고, 가치를 위하여서. 밝은 날카로우나 속잎나고, 피고 그들은 인생에 청춘의 같은 것이다. 수 천고에 눈이 실로 황금시대를 이상을 보이는 봄바람이다.</Text>
                </ScrollView>

                <View style={{flex: 0.5, flexDirection: 'row', padding: '5%'}}>
                    <View style={{marginHorizontal: '3%'}}>
                        <CheckBox
                        onValueChange={setIsAgree}
                        ></CheckBox>
                    </View>
                    <View style={{marginVertical: '3%'}}>
                        <Text>약관에 동의합니다.(필수)</Text>
                    </View>
                </View>
                {isAgree ? <TouchableOpacity 
                style={[styles.loginButton, {top: 0, width: '50%', height: '10%',}]}
                activeOpacity={0.8}
                onPress={() => navigation.push('Signup')}>
                    <Text style={styles.loginButtonText}>다음</Text>
                </TouchableOpacity>:
                <View
                style={[styles.loginButton, {top: 0, width: '50%', height: '10%', backgroundColor: '#dcdcdc'}]}>
                    <Text style={[styles.loginButtonText, {color: 'gray'}]}>다음</Text>
                </View>}
                
            </View>
        </SafeAreaView>
    )
}

export default SignupTerms