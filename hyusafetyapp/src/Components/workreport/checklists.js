import { Text } from "react-native"
import styles from "../../../styles"

export default [
    {
        title:'화기',
        title_eng: 'fire',
        checked: false,
        checklist: [
            {
                question: '불꽃, 불티 비산방지조치',
                reason: '',
                checked: false
            },
            {
                question: '압력조정기 부착 및 작동 상태',
                reason: '',
                checked: false
            },
            {
                question: '주위 인화성물질의 제거 상태',
                reason: '',
                checked: false
            },
            {
                question: '소화기 배치 유무',
                reason: '',
                checked: false
            },
            {
                question: '전격방지기의 정상 가동 상태',
                reason: '',
                checked: false
            },
            {
                question: '작업장소 환기',
                reason: '',
                checked: false
            },
            {
                question: '가연성 및 독성가스농도 측정',
                reason: '',
                checked: false
            },
            {
                question: '화재감시자 배치',
                reason: '',
                checked: false
            },
        ]
    },
    {
        title:'중량물',
        title_eng: 'weight',
        checked: false,
        checklist: [
            {
                question: '감독자의 지정 및 상주 여부',
                reason: '',
                checked: false
            },
            {
                question: '로프의 상태(파단 및 소손)',
                reason: '',
                checked: false
            },
            {
                question: '작업 신호자 지정 여부',
                reason: '',
                checked: false
            },
            {
                question: '적재물 이동 경로의 적정성',
                reason: '',
                checked: false
            },
            {
                question: '관계자 외 출입통제 조치',
                reason: '',
                checked: false
            },
        ]
    },
    {
        title:'밀폐공간',
        title_eng: 'closed',
        checked: false,
        checklist: [
            {
                question: ['산소농도 측정 \n', <Text style={styles.questionSubtitle}>*산소 18~23.5%</Text>],
                reason: '',
                checked: false
            },
            {
                question: ['가연성 및 독성가스농도 측정 \n', <Text style={styles.questionSubtitle}>*일산화탄소 30ppm 미만, 황화수소 10ppm 미만</Text>],
                reason: '',
                checked: false
            },
            {
                question: '2인 1조 작업 유무',
                reason: '',
                checked: false
            },
            {
                question: '환기 및 배기장치 조치',
                reason: '',
                checked: false
            },
            {
                question: '출입금지 표지판 설치',
                reason: '',
                checked: false
            },
            {
                question: '연락수단의 적정 유무',
                reason: '',
                checked: false
            },
            {
                question: '개인보호구 착용 상태',
                reason: '',
                checked: false
            },
        ]
    },
    {
        title:'고소',
        title_eng: 'height',
        checked: false,
        checklist: [
            {
                question: '2인 1조 작업 유무',
                reason: '',
                checked: false
            },
            {
                question: '추락위험 방호망 구비 상태',
                reason: '',
                checked: false
            },
            {
                question: '사다리의 파손 여부',
                reason: '',
                checked: false
            },
            {
                question: '이동식 비계 안전인증 유무',
                reason: '',
                checked: false
            },
            {
                question: '작업지지대의 작동 상태',
                reason: '',
                checked: false
            },
            {
                question: '안전모 착용 상태',
                reason: '',
                checked: false
            },
            {
                question: '안전대(2m 이상 시)착용 상태',
                reason: '',
                checked: false
            },
        ]
    },
    {
        title:'굴착',
        title_eng: 'excavation',
        checked: false,
        checklist: [
            {
                question: '전기동력선 안전한 배치조치',
                reason: '',
                checked: false
            },
            {
                question: '제어용 케이블의 안정성 유무',
                reason: '',
                checked: false
            },
            {
                question: '지하배관의 파악 여부',
                reason: '',
                checked: false
            },
            {
                question: '출입금지 표지판 설치',
                reason: '',
                checked: false
            },
            {
                question: '연락수단의 적정 유무',
                reason: '',
                checked: false
            },
            {
                question: '개인보호구 착용 상태',
                reason: '',
                checked: false
            },
            {
                question: '작업장 주변 정리정돈 상태',
                reason: '',
                checked: false
            },
            {
                question: '작업자의 자격 여부 확인 상태',
                reason: '',
                checked: false
            },
        ]
    },
    {
        title:'전기',
        title_eng: 'electricity',
        checked: false,
        checklist: [
            {
                question: '작업안내 표지판 설치',
                reason: '',
                checked: false
            },
            {
                question: '작업자의 자격 여부',
                reason: '',
                checked: false
            },
            {
                question: '접지 및 방전 여부',
                reason: '',
                checked: false
            },
            {
                question: '정전작업 전로 개폐 시건',
                reason: '',
                checked: false
            },
            {
                question: '기타 조치사항',
                reason: '',
                checked: false
            },
        ]
    },
    // {
    //     title:'기타',
    //     checked: false,
    //     checklist: [
    //         {
    //             question: '불꽃, 불티 비산방지조치',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '압력조정기 부착 및 작동 상태',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '주위 인화성물질의 제거 상태',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '소화기 배치 유무',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '전격방지기의 정상 가동 상태',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '작업장소 환기',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '가연성 및 독성가스농도 측정',
    //             reason: '',
    //             checked: false
    //         },
    //         {
    //             question: '화재감시자 배치',
    //             reason: '',
    //             checked: false
    //         },
    //     ]
    // },
]