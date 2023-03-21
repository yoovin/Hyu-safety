import express, { Request, Response, NextFunction } from 'express'
import { CallbackError} from 'mongoose'
const router = express.Router()
import admin from 'firebase-admin'

// Models
import Pushnotification from '../DB/model/Pushnotification'
import User from '../DB/model/User'

import getNextSequence from '../DB/getNextSequence'

/*
    ===== GET =====
*/
router.get('/getpushs', async (req: Request, res: Response) => {
    console.log(req.query)
    // console.log(req.query.page)
    if(req.query.reverse === '-1'){
        await Pushnotification.find(req.query).limit(10).sort({index: -1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await Pushnotification.countDocuments(req.query)
            res.send({pushs: data, count: count})
        })
    }else{
        await Pushnotification.find(req.query).limit(10).sort({index: 1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await Pushnotification.countDocuments(req.query)
            res.send({pushs: data, count: count})
        })
    }
})

/*
    ===== POST =====
*/

router.post('/upload', async (req: Request, res: Response) => {
    console.log(req.body)
    const fcm_token = new Array<string>
    const index = await getNextSequence("pushnotification")
    const newPush = new Pushnotification({
        index: index,
        id: req.body.id,
        title: req.body.title,
        desc: req.body.desc,
    })

    await Promise.all(req.body.id.map(async(userid:string) => {
        const data = await User.find({id: userid})
        if(data[0].fcm_token.length > 0){
            for(let t of data[0].fcm_token){
                fcm_token.push(t)
            }
        }
    }))

    if(fcm_token.length > 0){
        let message = {
            notification: {
                title: req.body.title,
                body: req.body.desc
            },
            tokens: fcm_token
        }
    
        await admin.messaging().sendMulticast(message)
        .then(response => {
            if (response.failureCount > 0) {
                const failedTokens: string[] = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(fcm_token[idx]);
                    }
                })
                newPush.$set('condition', false)
                newPush.$set('condition_reason', '전송에 실패한 토큰이 있습니다.')
                console.log('List of tokens that caused failures: ' + failedTokens)
            }
        })
    }else{
        newPush.$set('condition', false)
        newPush.$set('condition_reason', '전송 가능한 토큰이 없습니다.')
    }

    newPush.save((err: CallbackError, data: any) => {
        if(err){
            console.error(err)
            res.status(403).end()
        }})
    res.status(201).end()
})




export default router