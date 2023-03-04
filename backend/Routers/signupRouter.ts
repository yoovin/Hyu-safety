import express, { Request, Response, NextFunction } from 'express'
import { CallbackError } from 'mongoose'
const router = express.Router()

// Models
import User from '../DB/model/User'
import Userauth from '../DB/model/Userauth'

/*
    ===== TODOS =====
    로그인했을때 ip랑 가져오기
*/


// ~/signup
/*
    ===== GET =====
*/

// 회원가입시 id check
router.get('/idcheck', async (req: Request, res: Response) => {
    console.log(`아이디체크 쿼리 들어옴 ${req.query.id}`)
    const userid = await Userauth.findOne({id: req.query.id})
    if(userid == null){
        res.status(200).end()
    }else{ // 이미 있는 유저
        res.status(412).json({text: 'Already exist user'}).end()
    }
})

/*
    ===== POST =====
*/

router.post('/', async (req: Request, res: Response) => {
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
            birth: new Date(req.body.birth),
            phone: req.body.phone
        })

        newuser.save((err: CallbackError, data) => {
            if(err) console.error(err)
        })
        res.status(201).end()
    }else{ // 이미 있는 유저
        res.status(412).json({text: '이미 존재하는 유저입니다.'}).end()
    }
})

export default router