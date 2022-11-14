import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../styles'

const Notice = ({navigation}) => {
    const [notices, setNotices] = useState([])

    const onClickContent = (item) => {

        // navigation.navigate('NoticeContent', {
        //     contentTitle:item.contentTitle,
        //     content:item.content,
        //     contentDate:item.contentDate
        // })

        navigation.navigate('NoticeContent', item)
    }

    useEffect(()=>{
        // 대충 공지 불러오는 글
        setNotices([
            {
                title: '제목',
                content: '내용',
                date: '2022-11-13',
                team: '안전팀',
                subject: '행사안내'
            },
            {
                title: '안녕하세요',
                content: '테스트1',
                date: '2022-11-13',
                team: '안전팀',
                subject: '행사안내'
            },
            {
                title: '반갑습니다',
                content: '테스트2',
                date: '2022-11-13',
                team: '안전팀',
                subject: '행사안내',
            },
            {
                title: '입숨 로렘 입니다. 무려 한글판',
                content: `크고 인생을 무엇을 풀이 위하여, 교향악이다. 풀이 싹이 넣는 인생의 그러므로 시들어 거선의 용기가 없는 황금시대다. 청춘 그들을 따뜻한 뜨고, 뜨거운지라, 보이는 피부가 가진 교향악이다. 같이 피는 인도하겠다는 물방아 것이다. 미묘한 위하여 되려니와, 그와 위하여서. 보내는 속잎나고, 청춘 피어나기 꽃이 피다. 주는 이상 천지는 것은 광야에서 보는 거선의 어디 눈이 때문이다. 그들의 귀는 내려온 싸인 인간은 충분히 앞이 거친 운다. 무한한 피에 봄바람을 것이다. 역사를 이상의 너의 원질이 가치를 어디 것이다.

                그들에게 인간에 것은 소금이라 바이며, 싶이 길지 없으면 부패뿐이다. 어디 물방아 설산에서 인간의 못할 철환하였는가? 가진 일월과 소담스러운 현저하게 반짝이는 것은 그들은 있을 것이다. 더운지라 인생을 봄바람을 예수는 살았으며, 칼이다. 노년에게서 따뜻한 넣는 그들의 피고, 그들은 우리의 생명을 얼음과 아니다. 그들은 할지라도 스며들어 있음으로써 이것은 힘차게 두기 그들의 약동하다. 그들에게 우리 할지라도 힘차게 가는 것이다. 구할 것은 실로 사는가 기쁘며, 봄바람이다. 예수는 아니한 할지라도 인생을 뿐이다. 인도하겠다는 있는 커다란 것이다.보라, 찾아 피어나는 이 들어 얼마나 말이다. 만물은 얼마나 시들어 싶이 설산에서 이 있음으로써 봄바람이다.
                
                황금시대를 사랑의 구하기 이상의 물방아 따뜻한 있는 불어 뿐이다. 기쁘며, 인생을 가진 약동하다. 청춘의 피부가 구하지 운다. 물방아 무한한 피어나는 그와 보배를 풍부하게 끓는 갑 얼음 때문이다. 꽃이 노년에게서 거선의 생명을 사랑의 속에 되는 사는가 봄바람이다. 놀이 영원히 밝은 얼음에 희망의 아니더면, 우리 이상을 따뜻한 봄바람이다. 사람은 소담스러운 일월과 지혜는 자신과 못할 위하여서 뿐이다. 뛰노는 이는 너의 곳이 따뜻한 약동하다. 노년에게서 타오르고 이것을 천자만홍이 끓는 거선의 사막이다. 이상 그들은 안고, 있는 품고 있다.
                
                같이, 쓸쓸한 위하여 힘차게 있는 구하지 따뜻한 가슴에 철환하였는가? 천지는 용기가 전인 착목한는 예가 것이다. 우리의 기쁘며, 하는 천자만홍이 길을 못하다 방황하였으며, 있는가? 소리다.이것은 트고, 원질이 끓는 아름다우냐? 기관과 소리다.이것은 열락의 용기가 귀는 위하여, 아니더면, 사막이다. 사랑의 그러므로 밥을 피가 온갖 오아이스도 있는가? 사랑의 따뜻한 풍부하게 우리 할지니, 구하지 열락의 이상 이것이다. 자신과 모래뿐일 많이 사라지지 무엇이 곧 끓는다. 놀이 그들의 피가 보이는 예수는 든 인류의 운다.
                
                피가 천고에 과실이 그들은 청춘 사막이다. 타오르고 쓸쓸한 석가는 얼마나 것이다. 그들은 구할 심장의 이것은 스며들어 두기 든 인도하겠다는 피다. 수 방황하였으며, 곳이 되려니와, 앞이 무엇을 붙잡아 내는 끓는다. 갑 되려니와, 웅대한 듣기만 원질이 이것이다. 인도하겠다는 어디 붙잡아 품에 것이다. 트고, 대한 인생에 보내는 청춘의 풀이 아름다우냐? 그들은 창공에 그들의 아니더면, 가는 것이다. 불어 같이, 피는 그들의 속잎나고, 끓는다.
                
                수 가장 이상의 청춘의 투명하되 아름답고 이것은 피어나는 교향악이다. 귀는 얼마나 원질이 내는 가치를 못하다 되는 인류의 뼈 말이다. 그와 발휘하기 천자만홍이 동산에는 동력은 못할 사막이다. 것이다.보라, 심장은 과실이 운다. 남는 인도하겠다는 보이는 일월과 뭇 무한한 눈이 피가 굳세게 봄바람이다. 그들의 찾아다녀도, 실현에 모래뿐일 생명을 아름답고 두손을 것이다. 얼마나 그들의 기쁘며, 우리의 봄날의 없으면 아름다우냐? 오아이스도 인생에 석가는 천고에 그러므로 희망의 얼음 영원히 뼈 것이다. 보배를 피어나는 끝에 쓸쓸하랴? 웅대한 사람은 그들은 공자는 운다. 커다란 전인 긴지라 바이며, 피는 간에 할지라도 자신과 이상의 아니다.`,
                date: '2022-11-13',
                team: '심유빈',
                subject: '행사안내',
            }
        ])
    }, [])

    // console.log(notices)

    return (
        <View>
            <ScrollView style={{width: '100%', height:'100%'}}>
                {notices? notices.map(item => (
                    <TouchableOpacity 
                    style={styles.noticeContainer}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('NoticeContent', item)}>
                        <Text style={styles.noticeTitle}>{item.title}</Text>
                        <Text style={styles.noticeContent} numberOfLines={1} ellipsizeMode="tail">{item.content}</Text>
                        <Text style={styles.noticeDate}>{item.date} | {item.team} | {item.subject}</Text>
                    </TouchableOpacity>
                    ))
                :<Text>'불러오는 중'</Text>}
            </ScrollView>
        </View>
    )
}

export default Notice