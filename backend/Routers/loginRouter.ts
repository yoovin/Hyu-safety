import express, { Request, Response, NextFunction } from 'express'
import { CallbackError } from 'mongoose'
import jwt, { SignOptions } from 'jsonwebtoken'


const router = express.Router()

// Models
import Userauth from '../DB/model/Userauth'
import User from '../DB/model/User'

//JWT
const secretKey = process.env.SECRET_KEY
const algorithm = process.env.JWT_ALG
const expiresIn = process.env.JWT_EXP
const issuer = process.env.JWT_ISSUER

// const option: SignOptions = { algorithm, expiresIn, issuer }

const makeToken = (payload: Object) => {
    return jwt.sign(payload, secretKey!, {expiresIn, issuer});
}


/*
    ===== POST =====
*/

router.post('/', async (req: Request, res: Response) => {
    console.log(`login post 쿼리 들어옴 ip: ${req.ip}`)
    console.log(`id: ${req.body.id}, pw: ${req.body.pw}, token:${req.body.fcmToken}`)
    // ID로 유저 검색 
    const userid = await Userauth.findOne({id: req.body.id})
    if(userid != null){ // 아이디가 있을 경우
        if(userid.pw != req.body.pw){
            // 틀린 비밀번호
            res.status(401).json({text: "틀린 비밀번호 입니다."}).end()
        }else{
            // 로그인 성공
            const token = makeToken({id: req.body.id})
            // 최근 접속 아이피 및 날짜
            User.findOneAndUpdate(
                {id: userid.id},
                { $set: { // 데이터베이스에 들어있는 값을 바꿈
                    recent_login_ip: req.ip, 
                    recent_login_date: Date.now() + (540 * 60 * 1000) // 한국 시간대
                    
                },
                $addToSet: { // 추가
                    fcm_token: req.body.fcmToken
                }}
                ).exec()
            res.status(200).send(token) // 성공시 jwt 토큰 반환
        }
    }else{
        // 없는 아이디
        res.status(401).json({text: "없는 아이디 입니다."}).end()
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    console.log(`admin logout post 쿼리 들어옴 ip: ${req.ip}, id: ${req.body.id}`)
    const {fcmToken} = req.body // 푸시알림을 위한 FCM 토큰
    let updateUser = await User.findOneAndUpdate(
        { id: req.userid},
        { $pull: { // 
                fcm_token: fcmToken
            }
        },
        { returnNewDocument: true } // 가져온 유저 정보를 반환하게 함
    ).exec()

    if(updateUser != null){
        res.status(200).end()
    }else{
        console.log('null')
        res.status(401).end()
    }
})

router.post('/admin', async (req: Request, res: Response) => {
    console.log(`admin login post 쿼리 들어옴 ip: ${req.ip}`)
    const {id, pw} = req.body
    console.log(`id: ${id}, pw: ${pw}`)
    if(id === 'admin' && pw == 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg='){
        const token = makeToken({id})
        res.status(200).send(token)
        // res.cookie('token', token)
        // res.cookie('token', token, {
        //     // maxAge: 60*60*1000,
        //     // httpOnly: true,
        // }).end()
    }else{
        res.status(401).json({text: "없는 아이디 입니다."}).end()
    }
})

export default router