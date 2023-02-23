import express, { Request, Response, NextFunction } from 'express'
import { CallbackError } from 'mongoose'
const router = express.Router()

// Models
import Userauth from '../DB/model/Userauth'
import User from '../DB/model/User'


router.get('/getuserinfo', async (req: Request, res: Response) => {
    const user = await User.findOne({id: req.query.id})
    if(user != null){
        res.send(user)
    }else{
        res.status(400).end()
    }
    
})

router.get('/getusers', async (req: Request, res: Response) => { // 어드민용
    console.log(req.query)
    // console.log(req.query.page)
    if(req.query.reverse === '-1'){
        // await Notice.find(req.query).limit(10).sort({index: -1})
        await User.find(req.query).limit(10).sort({_id: -1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await User.countDocuments(req.query)
            res.send({users: data, count: count})
        })
    }else{
        await User.find(req.query).limit(10).sort({_id: 1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await User.countDocuments(req.query)
            res.send({users: data, count: count})
        })
    }
})


/*
    ===== POST =====
*/

router.post('/', async (req: Request, res: Response) => {
    console.log(`login post 쿼리 들어옴 ip: ${req.ip}`)
    console.log(`id: ${req.body.id}, pw: ${req.body.pw}`)
    const userid = await Userauth.findOne({id: req.body.id})
    if(userid != null){
        if(userid.pw != req.body.pw){
            // 틀린 비밀번호
            res.status(401).json({text: "틀린 비밀번호 입니다."}).end()
        }else{
            // 최근 접속 아이피 및 날짜
            // const curUser = User.updateOne({id: userid.id}, {recent_login_ip: req.ip, recent_login_date: Date.now()})
            res.status(200).end()
        }
    }else{
        // 없는 아이디
        res.status(401).json({text: "없는 아이디 입니다."}).end()
    }
})

router.post('/update', async (req: Request, res: Response) => {
    console.log(req.body)
    let updateUser = await User.findOneAndUpdate(
        { id: req.body.id },
        { $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            position: req.body.position,
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateUser != null){
        res.status(200).end()
    }else{
        console.log('null')
        res.status(404).end()
    }
})

export default router