import express, { Request, Response, NextFunction } from 'express'
import { CallbackError } from 'mongoose'
const router = express.Router()

// Models
import Userauth from '../DB/model/Userauth'
// import Userauth from 

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

export default router