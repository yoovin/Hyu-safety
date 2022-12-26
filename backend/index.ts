import express, { Request, Response, NextFunction } from 'express';
import { CallbackError } from 'mongoose';
import bodyParser from 'body-parser'

const app = express();

// Database
import connectDB from './DB/connectDB';
import User from './DB/model/User';
import Userauth from './DB/model/Userauth';

/*
    ===== TODOS =====
    로그인했을때 ip랑 가져오기
*/

connectDB()

app.use(bodyParser.json())

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

app.listen(1234, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 1234🛡️
    ################################################
`);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world!")
})

/*
    ===== 로그인 및 회원가입 =====
*/

// 회원가입시 id check
app.get('/idcheck', async (req: Request, res: Response) => {
    console.log(`아이디체크 쿼리 들어옴 ${req.query.id}`)
    const userid = await Userauth.findOne({id: req.query.id})
    if(userid == null){
        res.status(200).end()
    }else{ // 이미 있는 유저
        res.status(412).json({text: 'Already exist user'}).end()
    }
})

app.post('/login', async (req: Request, res: Response) => {
    console.log(`login post 쿼리 들어옴 ip: ${req.ip}`)
    const userid = await Userauth.findOne({id: req.body.id})
    if(userid != null){
        if(userid.pw != req.body.pw){
            // 틀린 비밀번호
            res.status(401).json({text: "틀린 비밀번호 입니다."}).end()
        }else{
            // 고치기
            const curUser = User.updateOne({id: userid.id}, {recent_login_ip: req.ip, recent_login_date: new Date()})
            res.status(200).end()
        }
    }else{
        // 없는 아이디
        res.status(401).json({text: "없는 아이디 입니다."}).end()
    }
})

app.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body)
    const userid = await Userauth.findOne({id: req.body.id})
    if(userid == null){
        // 회원가입
        const newuserauth = new Userauth({
            id: req.body.id,
            pw: req.body.pw
        })
        newuserauth.save((err: CallbackError, data) => {
            if(err) console.error(err)
            })

        const newuser = new User({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })

        newuser.save((err: CallbackError, data) => {
            if(err) console.error(err)
        })
        res.status(201).end()
    }else{ // 이미 있는 유저
        res.status(412).json({text: 'Already exist user'}).end()
    }
})
});