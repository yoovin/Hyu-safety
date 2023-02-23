import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';


const app = express()
const port: number = 1234

// Routers
import signupRouter from './Routers/signupRouter'
import userRouter from './Routers/userRouter'
import noticeRouter from './Routers/noticeRouter'
import suggestionRouter from './Routers/suggestionRouter'
import workreportRouter from './Routers/workreportRouter'



// Database
import connectDB from './DB/connectDB';

connectDB()


app.listen(port, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${port}🛡️
    ################################################
    `);

    app.use(bodyParser.json())
    app.use(cors())
    app.use(express.static('./Routers/uploads')) // 이미지

    app.get('/', (req: Request, res: Response) => {
        res.send("서버 잘 돈다")
    })

    /*
        ===== 로그인 및 회원가입 =====
    */
    app.use('/signup', signupRouter)
    app.use('/login', userRouter)

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



});