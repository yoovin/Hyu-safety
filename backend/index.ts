import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'

const app = express();

// Routers
import signupRouter from './Routers/signupRouter'
import loginRouter from './Routers/loginRouter'


// Database
import connectDB from './DB/connectDB';
connectDB()


app.listen(1234, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 1234🛡️
    ################################################
    `);

    app.use(bodyParser.json())

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
});