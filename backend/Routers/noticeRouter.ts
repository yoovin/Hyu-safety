import express, { Request, Response, NextFunction } from 'express'
import { CallbackError} from 'mongoose'
import multer from 'multer'
const router = express.Router()

// Models
import Notice from '../DB/model/Notice'
import Noticedesc from '../DB/model/Noticedesc'

import getNextSequence from '../DB/getNextSequence'

const upload = multer({
    dest: __dirname + '/uploads/notice/'
})

// const showNotice = (page: number): any => {
//     return Notice.find(req.query).limit(10).sort({index: -1}).skip((page-1)*10).limit(10)
// }

/*
    ===== GET =====
*/
router.get('/', async (req: Request, res: Response) => {
    console.log(req.query)
    // console.log(req.query.page)
    if(req.query.reverse === '-1'){
        await Notice.find(req.query).limit(10).sort({index: -1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await Notice.countDocuments(req.query)
            res.send({notices: data, count: count})
        })
    }else{
        await Notice.find(req.query).limit(10).sort({index: 1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await Notice.countDocuments(req.query)
            res.send({notices: data, count: count})
        })
    }
})

router.get('/detail', async (req: Request, res: Response) => {
    let sendData: any = {}
    await Notice.findOne({index: req.query.index})
    .then(data => {
        sendData.info = data
    })
    await Noticedesc.findOne({index: req.query.index})
    .then(data => {
        sendData.desc = data?.desc
    })
    res.send(sendData)
})

/*
    ===== POST =====
*/

router.post('/upload', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = await getNextSequence("notice")
    const newNotice = new Notice({
        index: index,
        title: req.body.title,
        author: req.body.author,
        subject: req.body.subject,
    })

    const newNoticeDesc = new Noticedesc({
        index: index,
        desc: req.body.desc,
    })

    newNoticeDesc.save((err: CallbackError, data) => {
        if(err) console.error(err)
            res.status(403).end()
        })

    newNotice.save((err: CallbackError, data) => {
        if(err) console.error(err)
            res.status(403).end()
        })

    res.status(201).end()
})

router.post('/update', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = req.body.index
    let updateNotice = await Notice.findOneAndUpdate(
        { index: index },
        { $set: {
            title: req.body.title,
            author: req.body.author,
            subject: req.body.subject,
            }
        },
        { returnNewDocument: true }
    ).exec()

    let updateNoticeDesc = await Noticedesc.findOneAndUpdate(
        { index: index },
        { $set: {
            desc: req.body.desc,
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateNotice != null && updateNoticeDesc != null){
        res.status(200).end()
    }else{
        console.log('null')
        console.log(updateNotice, updateNoticeDesc)
        res.status(404).end()
    }
})

router.post('/status', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = req.body.index
    let updateNotice = await Notice.findOneAndUpdate(
        { index: index },
        { $set: {
            uploaded: req.body.uploaded,
            deleted: req.body.deleted
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateNotice != null){
        res.status(200).end()
    }else{
        console.log('null')
        console.log(updateNotice)
        res.status(404).end()
    }
})

router.post('/upload/image', upload.single('file'), async (req: Request, res: Response) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file!
    const { name } = req.body;

    console.log("body 데이터 : ", name);
    console.log("폼에 정의된 필드명 : ", fieldname);
    console.log("사용자가 업로드한 파일 명 : ", originalname);
    console.log("파일의 엔코딩 타입 : ", encoding);
    console.log("파일의 Mime 타입 : ", mimetype);
    console.log("파일이 저장된 폴더 : ", destination);
    console.log("destinatin에 저장된 파일 명 : ", filename);
    console.log("업로드된 파일의 전체 경로 ", path);
    console.log("파일의 바이트(byte 사이즈)", size);

    res.json({ok: true, url: `/notice/${filename}`})
})



export default router