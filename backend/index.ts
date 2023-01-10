import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';


const app = express()
const port: number = 1234

// Routers
import signupRouter from './Routers/signupRouter'
import loginRouter from './Routers/loginRouter'
import noticeRouter from './Routers/noticeRouter'



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
    app.use('/login', loginRouter)

    /*
        ===== 공지사항 =====
    */

    app.use('/notice', noticeRouter)
});