import express, { Request, Response, NextFunction } from 'express'
import { CallbackError } from 'mongoose'
import fs from 'fs'
const router = express.Router()

import readXlsxFile from 'read-excel-file/node'
import writeXlsxFile from 'write-excel-file/node'

// Models
import Userauth from '../DB/model/Userauth'
import User from '../DB/model/User'


router.get('/getuserinfo', async (req: Request, res: Response) => {
    console.log(`유저 정보 요청들어옴${req.query.id}`)
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
    console.log(`id: ${req.body.id}, pw: ${req.body.pw}, token:${req.body.fcmToken}`)
    const userid = await Userauth.findOne({id: req.body.id})
    if(userid != null){
        if(userid.pw != req.body.pw){
            // 틀린 비밀번호
            res.status(401).json({text: "틀린 비밀번호 입니다."}).end()
        }else{
            // 최근 접속 아이피 및 날짜
            const curUser = User.findOneAndUpdate(
                {id: userid.id},
                { $set: {
                    recent_login_ip: req.ip, 
                    recent_login_date: Date.now() + (540 * 60 * 1000)
                    
                },
                $addToSet: {
                    fcm_token: req.body.fcmToken
                }}
                ).exec()
            res.status(200).end()
        }
    }else{
        // 없는 아이디
        res.status(401).json({text: "없는 아이디 입니다."}).end()
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    console.log(`admin logout post 쿼리 들어옴 ip: ${req.ip}, id: ${req.body.id}`)
    const {id, fcmToken} = req.body
    let updateUser = await User.findOneAndUpdate(
        { id: id },
        { $pull: {
                fcm_token: fcmToken
            }
        },
        { returnNewDocument: true }
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
        res.status(200).end()
    }else{
        res.status(401).json({text: "없는 아이디 입니다."}).end()
    }
})

router.post('/update/info', async (req: Request, res: Response) => {
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

router.post('/update/password', async (req: Request, res: Response) => {
    console.log(req.body)
    let updateUser = await Userauth.findOneAndUpdate(
        { id: req.body.id },
        { $set: {
                pw: req.body.password
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

router.delete('/delete', async (req: Request, res: Response) => {
    console.log(req.body)
    // res.status(200).end()
    let updateUser = await User.deleteOne(
        { id: req.body.id },
    ).exec()

    let updateUserauth = await Userauth.deleteOne(
        { id: req.body.id },
    ).exec()

    if(updateUser != null && updateUserauth != null){
        res.status(200).end()
    }else{
        console.log('null')
        res.status(404).end()
    }
})

router.get('/download', async (req: Request, res: Response) => {
    const HEADER_ROW = [
        {
            value: "아이디",
            fontWeight: "bold",
        },
        {
            value: "이름",
            fontWeight: "bold",
        },
        {
            value: "이메일",
            fontWeight: "bold",
        },
        {
            value: "전화번호",
            fontWeight: "bold",
        },
        {
            value: "직급",
            fontWeight: "bold",
        },
        {
            value: "생성일자",
            fontWeight: "bold",
        },
        {
            value: "최근로그인IP",
            fontWeight: "bold",
        },
        {
            value: "최근로그인",
            fontWeight: "bold",
        },
        {
            value: "FCM토큰",
            fontWeight: "bold",
        },
        
    ]

    const excelData: Array<Array<object>> = [HEADER_ROW]
    await User.find({})
        .then(async data => {
            data.map((item) => {
                excelData.push([
                    // 아이디
                    {
                        type: String,
                        value: item.id,
                    },
                    // 이름
                    {
                        type: String,
                        value: item.name,
                    },
                    // 이메일
                    {
                        type: String,
                        value: item.email,
                    },
                    // 전화번호
                    {
                        type: String,
                        value: item.phone,
                    },
                    // 직급
                    {
                        type: String,
                        value: item.position,
                    },
                    // 생성일자
                    {
                        type: Date,
                        value: item.created_at,
                        format: "yyyy/mm/dd HH:MM:SS"
                    },
                    // 최근로그인IP
                    {
                        type: String,
                        value: item.recent_login_ip,
                    },
                    // 최근로그인
                    {
                        type: Date,
                        value: item.recent_login_date,
                        format: "yyyy/mm/dd HH:MM:SS"
                    },
                    // 토큰
                    // {
                    //     type: String,
                    //     value: item.fcm_token,
                    // },
                ])
            })
        })
        .then(async () => {
            if (!fs.existsSync("./Routers/downloads/excel")) {
                // excel 폴더가 존재하지 않는 경우 excel 폴더를 생성한다.
                fs.mkdirSync("./Routers/downloads/excel")
            }
            await writeXlsxFile(excelData, {
                filePath: `./Routers/downloads/excel/user.xlsx`,
            })
            .then(() => {
                let file = __dirname + '/downloads/excel/user.xlsx'
                res.download(file)
            })
        })    
})

export default router