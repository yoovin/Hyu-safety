import { StyleSheet } from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize"

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
        // alignItems: 'center',
        // backgroundColor:'pink'
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

    loginNyangBackground: {
        // position: 'absolute',
        // top:'80%',
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
    ===== Notice COMPONENT =====
    */
    noticeContainer: {
        padding:'5%',
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },

    noticeTitle: {
        fontSize: RFPercentage(3),
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
    ===== NoticeContent COMPONENT =====
    */
    content:{
        fontSize: RFPercentage(3),
        fontFamily: 'BMJUA',
        color: 'black',
    },

    /*
    ===== Report COMPONENT =====
    */

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
        marginTop:'9%',
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
        fontSize: RFPercentage(3)
    }

});