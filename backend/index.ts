import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


const app = express()
const port: number = 1234
dotenv.config()

const fireAccount: Object = require('./firebasekey.json')

// Routers
import jwtFilter from './Routers/jwtFilter'
import signupRouter from './Routers/signupRouter'
import loginRouter from './Routers/loginRouter'
import userRouter from './Routers/userRouter'
import noticeRouter from './Routers/noticeRouter'
import suggestionRouter from './Routers/suggestionRouter'
import workreportRouter from './Routers/workreportRouter'
import pushnotificationRouter from './Routers/pushnotificationRouter'



// Database
import connectDB from './DB/connectDB';

connectDB()
admin.initializeApp({
    credential: admin.credential.cert(fireAccount)
})


app.listen(port, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${port}🛡️
    ###############################################
    `)


    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(cors({
        origin: true, // 출처 허용 옵션
        credentials: true // 사용자 인증이 필요한 리소스 접근에 필요함
    }))
    app.use(express.json({ limit: '50mb' }))
    app.use(express.urlencoded({ limit: '50mb', extended: true }))

    app.use(express.static('./Routers/uploads')) // 이미지

    app.get('/', (req: Request, res: Response) => {
        res.send("서버 잘 돈다")
    })

    /*
        ===== JWT Filter =====
    */
    app.use(jwtFilter)

    /*
        ===== 로그인 및 회원가입 =====
    */
    app.use('/signup', signupRouter)
    app.use('/login', loginRouter)

    /*
        ===== 유저정보 =====
    */

    app.use('/user', userRouter)

    /*
        ===== 공지사항 =====
    */
    app.use('/notice', noticeRouter)
    
    /*
        ===== 건의 =====
    */
    app.use('/suggestion', suggestionRouter)

    /*
        ===== 안전작업 =====
    */
    app.use('/workreport', workreportRouter)

    /*
        ===== 푸시알림 =====
    */
    app.use('/pushnotification', pushnotificationRouter)



});