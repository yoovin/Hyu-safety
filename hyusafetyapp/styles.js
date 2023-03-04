import { StyleSheet } from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize"

/*
    1. display
    2. list-style
    3. position
    4. float
    5. clear
    6. width / height
    7. padding / margin
    8. border / background
    9. color / font
    10. text-decoration
    11. text-align / vertical-align
    12. white-space
    13. other text
    14. content
*/

const mainColor = '#91a4ff'

export default StyleSheet.create({
    /*
    ===== NAVI COMPONENT =====
    */
    viewContainer: {
        flex:1.5
    },
    contentContainer: {
        flex: 1,
        flexDirection:'row'
    },
    leftView:{
        flex:1
    },
    titleView: {
        flex: 4.5,
        alignItems:'center',
    },
    titleText: {
        fontFamily: 'BMJUA',
        fontSize: RFPercentage(3),
        color: 'white',
    },
    rightView: {
        flex: 1
    },
    navi: {
        width: '100%',
        height: '10%',
        backgroundColor: mainColor
    },

    backButtonText:{
        fontFamily: 'BMJUA',
        color: 'white',
        fontSize: RFPercentage(3),
    },

    /*
    ===== LOGIN COMPONENT =====
    */
    logoView: {
        flex: 3,
        justifyContent: 'center',
    },

    idInputView: {
        flex: 3,
        height: '100%',
        padding: '2%',
        margin: '5%',
        borderRadius: 10,
        backgroundColor:'#ffffff'
    },

    inputTitleText: {
        left: '3%',
        fontFamily: 'BMJUA',
        fontSize: RFPercentage(2),
        marginBottom: '1%'

    },

    input: {
        height:'10%',
        margin: '3%',
        marginHorizontal: '5%',
        borderWidth: 1,
        paddingHorizontal: '3%',
        marginBottom: '5%',
        fontSize: RFPercentage(2)
    },

    loginButton: {
        top: '5%',
        left: '25%',
        width: '50%',
        height: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor

    },

    loginButtonText: {
        fontSize: RFPercentage(4),
        fontFamily: 'BMJUA',
        color: 'white'
    },

    signupText: {
        left: '17%',
        fontFamily: 'BMJUA',
        color: 'gray',
        textDecorationLine: 'underline',
    },

    loginLogoBackground: {
        position: 'absolute',
        width: '94%', 
        height: '98%', 
        resizeMode: 'contain',
        opacity: 0.5,

        top:'3%',
        left:'5%',
        // width: '65%', 
        // height: '70%', 
        // resizeMode: 'contain',
    },

    loginNyangBackground: {
        // position: 'absolute',
        top:'30%',
        left:'29%',
        width: '65%', 
        height: '80%', 
        resizeMode: 'contain',
    },
    
    /*
    ===== SIGNUP COMPONENT =====
    */
    termsView: {
        flex: 1,
        marginVertical: '3%',
        padding: '3%',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        // backgroundColor: '#DCDCDC'
    },

    signupInput: {
        width: '80%',
        height:'5%',
        margin: '3%',
        marginHorizontal: '5%',
        borderWidth: 1,
        paddingHorizontal: '3%',
        marginBottom: '5%',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        fontSize: RFPercentage(2)
    },

    idcheckButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        height: '50%',
        borderRadius: 5,
        backgroundColor: mainColor,
    },

    warningText: {
        marginHorizontal: '3%',
        color: 'red',
        fontFamily: 'BMJUA',
        fontSize: RFPercentage(1.5),
    },

    resultText: {
        marginTop: '3%',
        fontSize: RFPercentage(2),
        fontFamily: 'BMJUA',
        // color: 'white'
    },

    /*
    ===== MAIN COMPONENT =====
    */

    footer: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        paddingBottom: '3%',
        backgroundColor: '#91a4ff',
    },

    menuItem: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuText: {
        fontSize: RFPercentage(2),
        fontFamily: 'BMJUA',
        marginTop: '10%',
        color: 'white'
    },

    notificationNumCircle: {
        top: '-90%',
        left: '30%',
        width:'35%',
        height:'35%',
        borderRadius:15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    notificationNum: {
        fontSize: RFPercentage(1.5),
        fontFamily: 'BMJUA',
        color: 'white',
        
    },

    /*
    ===== HOME COMPONENT =====
    */

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: '37%',
        margin: 16,
        borderColor: 'black',
        borderRadius: 10,
        resizeMode: 'contain',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '62%',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    paginationDotActive: {
        backgroundColor: '#333',
    },

    /*
    ===== Notice COMPONENT =====
    */
    noticeContainer: {
        padding:'5%',
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },

    noticeTitle: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'BMJUA',
        color: 'black',
        marginBottom: 5
    },

    noticeContent: {
        fontSize: RFPercentage(2),
        fontFamily: 'BMJUA',
        color: 'gray',
        marginBottom: 5
    },

    noticeDate: {
        fontSize: RFPercentage(1.5),
        fontFamily: 'BMJUA',
        color: 'gray',
    },

    /*
    ===== NoticeDetail COMPONENT =====
    */
    content:{
        fontSize: RFPercentage(3),
        fontFamily: 'BMJUA',
        color: 'black',
    },

    /*
    ===== Live Report COMPONENT =====
    */
    chatView: {
        height: '93%',
        backgroundColor: '#e2e8f0'
    },

    firstInfo: {

    },

    myChat: {
        height:'100%',
        padding: '2%',
        // alignItems: 'flex-end',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fde047',
    },

    otherChat: {
        flexWrap:'wrap',
        flexShrink: 1,
        height:'100%',
        padding: '2%',
        // alignItems: 'flex-end',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#d6d3d1'
    },

    inputChat: {
        flexShrink: 1,
        width: '80%',
        height: '80%',
        backgroundColor:'#e5e7eb',
        borderRadius: 5,
        
        // borderColor: mainColor,
        // borderWidth: 3,
    },

    inputChatButton: {
        width: '9%',
        height: '80%',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputChatView: {
        flexDirection: 'row',
        height:'7%',
        justifyContent:'space-evenly',
        alignItems: 'center',
        // backgroundColor:'#e5e7eb'
    },

    /*
    ===== Profile COMPONENT =====
    */

    item: {
        fontSize: RFPercentage(5),
        fontFamily: 'BMJUA',
        color: 'black'
    },

    itemText: {
        fontSize: RFPercentage(3),
        fontFamily:'BMJUA',
        color: 'black',
        marginTop: '10%',
        height:RFPercentage(3.5),
    },

    bottomHrLine:{
        width:'100%',
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },

    logoutButton: {
        top: '5%',
        left: '25%',
        width: '50%',
        height: '50%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor
    },

    logoutButtonText: {
        fontFamily: 'BMJUA',
        fontSize: RFPercentage(3),
        color: 'white'
    },

    /*
    ===== Suggestion COMPONENT =====
    */

    infoHr: {
        width: '50%',
        marginHorizontal: 5, 
        borderBottomWidth: 1, 
        borderBottomColor: 'black', 
        alignItems:'center', 
        justifyContent: 'center'
    },

    uploadImageSkeleton: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: 'gray'
    },

    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 7,
        resizeMode: 'cover'
    },

    imageRemoveButton: {
        position: 'absolute',
        left: '85%',
        bottom: '80%', 
        width: '20%', 
        height: '25%', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },

    deleteButton: {
        width:'20%',
        height: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'red'
    },

    /*
    ===== WorkReport Component =====
    */

    workInput: {
        padding: 2,
        marginLeft: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },

    guideText: {
        fontSize: RFPercentage(2),
        fontFamily:'BMJUA',
        color: 'red'
    },

    conditionCircle: {
        width:'25%', 
        // margin: 5, 
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },

    /*
    ===== Checklist Component =====
    */
    questionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
    questionSubtitle: {
        color: 'red',
        fontSize: RFPercentage(1.7)
    },

    /*
    ===== Font =====
    */
    textXs: {
        fontSize: RFPercentage(1)
    },

    textSm: {
        fontSize: RFPercentage(1.5)
    },

    textBase: {
        fontSize: RFPercentage(2)
    },

    textLg: {
        fontSize: RFPercentage(2.5)
    },

    textXl: {
        fontSize: RFPercentage(3)
    },

    text2xl: {
        fontSize: RFPercentage(4)
    },

    mainFont: {
        fontFamily:'BMJUA',
    },

    mainColor: {
        color: mainColor
    },

    mainBgColor: {
        backgroundColor: mainColor
    },
});