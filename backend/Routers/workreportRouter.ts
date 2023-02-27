import express, { Request, Response } from 'express'
import { CallbackError } from 'mongoose'
import multer from 'multer'
const router = express.Router()

import readXlsxFile from 'read-excel-file/node'
import writeXlsxFile from 'write-excel-file/node'
import fs from 'fs'

// Models
import Workreport from '../DB/model/Workreport'
import getNextSequence from '../DB/getNextSequence'

// const upload = multer({
//     dest: __dirname + '/uploads/workreport/'
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/workreport/') // 저장될 경로 설정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // 저장될 파일명 설정
    }
})


const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50, fieldSize: 1024 * 1024 * 50, }, })

const work_kor = {
    fire: '화재',
    excavation: '굴착',
    closed: '밀폐공간',
    height: '고소',
    weight: '중량물',
    electricity: '전기'
}

/*
    ===== GET =====
*/
router.get('/', async (req: Request, res: Response) => {
    console.log(req.query)
    // console.log(req.query.page)
    if(req.query.reverse === '-1'){
        await Workreport.find(req.query).limit(10).sort({index: -1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await Workreport.countDocuments(req.query)
            res.send({workreports: data, count: count})
        })
    }else{
        Workreport.find(req.query)
        .then(async data => {
            const count = await Workreport.countDocuments(req.query)
            res.send({workreports: data, count: count})
        })
    }
})

router.get('/detail', async (req: Request, res: Response) => {
    console.log(`workreport detail get`)
    console.log(req.query)
    let sendData: any = {}
    await Workreport.findOne({index: req.query.index})
    .then(data => {
        res.send(data)
    })
})

router.get('/download', async (req: Request, res: Response) => {
    // let startDate: Date = new Date(req.query.startDate)
    // let endDate: Date = new Date(req.query.endDate)
    const HEADER_ROW = [
        {
            value: "작업신고번호",
            fontWeight: "bold",
        },
        {
            value: "신청부서",
            fontWeight: "bold",
        },
        {
            value: "직책",
            fontWeight: "bold",
        },
        {
            value: "이름",
            fontWeight: "bold",
        },
        {
            value: "아이디",
            fontWeight: "bold",
        },
        {
            value: "연락처",
            fontWeight: "bold",
        },
        {
            value: "신청서 작성 일자",
            fontWeight: "bold",
        },
        {
            value: "허가요청기간_시작",
            fontWeight: "bold",
        },
        {
            value: "허가요청기간_종료",
            fontWeight: "bold",
        },
        {
            value: "작업장소",
            fontWeight: "bold",
        },
        {
            value: "장비투입",
            fontWeight: "bold",
        },
        {
            value: "작업인원",
            fontWeight: "bold",
        },
        {
            value: "작업내용",
            fontWeight: "bold",
        },
        {
            value: "요청사항",
            fontWeight: "bold",
        },
        {
            value: "기타작업",
            fontWeight: "bold",
        },
        {
            value: "작업종류",
            fontWeight: "bold",
        },
        {
            value: "승인상태",
            fontWeight: "bold",
        },
        {
            value: "승인자부서",
            fontWeight: "bold",
        },
        {
            value: "승인자직책",
            fontWeight: "bold",
        },
        {
            value: "승인자이름",
            fontWeight: "bold",
        },
        {
            value: "허가내용",
            fontWeight: "bold",
        },
    ]

    const excelData: Array<Array<object>> = [HEADER_ROW]

    console.log(req.query.startDate)
    console.log(req.query.endDate)
    await Workreport.find({deleted: false, upload_date: {$gte: req.query.startDate, $lte: req.query.endDate}})
        .then(async data => {
            data.map((item, idx) => {
                let workType: string = ""
                for(let key in item.checklist){
                    workType += `${work_kor[key as keyof typeof work_kor]}, `
                }

                excelData.push([
                    // 작업신고번호
                    {
                        type: Number,
                        value: item.index,
                    },
                    // 신청부서
                    {
                        type: String,
                        value: item.request_depart,
                    },
                    // 직책
                    {
                        type: String,
                        value: item.position,
                    },
                    // 이름
                    {
                        type: String,
                        value: item.name,
                    },
                    // 아이디
                    {
                        type: String,
                        value: item.id,
                    },
                    // 연락처
                    {
                        type: String,
                        value: item.phone,
                    },
                    // 신청서작성일자
                    {
                        type: Date,
                        value: item.upload_date,
                        format: "yyyy/mm/dd"
                    },
                    // 허가요청기간_시작
                    {
                        type: Date,
                        value: item.start_date,
                        format: "yyyy/mm/dd HH:MM:SS"
                    },
                    // 허가요청기간_종료
                    {
                        type: Date,
                        value: item.end_date,
                        format: "yyyy/mm/dd HH:MM:SS"
                    },
                    // 작업장소
                    {
                        type: String,
                        value: item.work_place,
                    },
                    // 장비투입
                    {
                        type: String,
                        value: item.equipment_input,
                    },
                    // 작업인원
                    {
                        type: Number,
                        value: item.work_people,
                    },
                    // 작업내용
                    {
                        type: String,
                        value: item.work_content,
                    },
                    // 요청사항
                    {
                        type: String,
                        value: item.request,
                    },
                    // 기타작업
                    {
                        type: String,
                        value: item.other_work,
                    },
                    // 작업종류
                    {
                        type: String,
                        value: workType,
                    },
                    // 승인상태
                    {
                        type: String,
                        value:
                        item.condition === 'approval' && '승인완료' ||
                        item.condition === 'refused' && '승인거부' ||
                        item.condition === 'waited' && '승인대기'
                    },
                    // 승인자부서
                    {
                        type: String,
                        value: item.per_depart,
                    },
                    // 승인자직책
                    {
                        type: String,
                        value: item.per_position,
                    },
                    // 승인자이름
                    {
                        type: String,
                        value: item.per_name,
                    },
                    // 허가내용
                    {
                        type: String,
                        value: item.per_comment,
                    },
                ])
            })
        })
        .then(async () => {
            if (!fs.existsSync("./Routers/downloads/excel")) {
                // excel 폴더가 존재하지 않는 경우 excel 폴더를 생성한다.
                fs.mkdirSync("./Routers/downloads/excel")
            }
            await writeXlsxFile(excelData, {
                filePath: `./Routers/downloads/excel/workreport.xlsx`,
            })
            .then(() => {
                let file = __dirname + '/downloads/excel/workreport.xlsx'
                res.download(file)
            })
        })    
})


/*
    ===== POST =====
*/

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    // const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file!
    console.log(req.file)
    console.log(req.body)

    let checklists = {
        fire:{
            checked: req.body.fire_checked,
            reason: req.body.fire_reason
        },
        weight:{
            checked: req.body.weight_checked,
            reason: req.body.weight_reason
        },
        closed:{
            checked: req.body.closed_checked,
            reason: req.body.closed_reason
        },
        height:{
            checked: req.body.height_checked,
            reason: req.body.height_reason
        },
        excavation:{
            checked: req.body.excavation_checked,
            reason: req.body.excavation_reason
        },
        electricity:{
            checked: req.body.electricity_checked,
            reason: req.body.electricity_reason
        },
    }

    const index = await getNextSequence("workreport")

    const newWorkreport = new Workreport({
        index: index,
        id: req.body.id,
        request_depart: req.body.requestDepart,
        position: req.body.position,
        name: req.body.name,
        phone: req.body.phone,
        work_place: req.body.workPlace,
        work_content: req.body.workContent,
        equipment_input: req.body.equipmentInput,
        work_people: parseInt(req.body.workPeople),
        request: req.body.request,
        other_work: req.body.other_work,
        start_date: new Date(req.body.startDate),
        end_date: new Date(req.body.endDate),
        signfile_name: req.file!.filename,
        checklist: checklists
    })

    newWorkreport.save((err: CallbackError, data) => {
        if(err){
            console.error(err)
            res.status(403).end()
        }else{
            res.status(201).end()
        }})
})

router.post('/permit', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = req.body.index
    let updateWorkreport = await Workreport.findOneAndUpdate(
        { index: index },
        { $set: {
            per_depart: req.body.per_depart,
            per_position: req.body.per_position,
            per_name: req.body.per_name,
            per_comment: req.body.per_comment,
            condition: req.body.condition
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateWorkreport != null){
        res.status(200).end()
    }else{
        console.log('null')
        console.log(updateWorkreport)
        res.status(404).end()
    }
})

router.post('/delete', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = req.body.index
    let updateWorkreport = await Workreport.findOneAndUpdate(
        { index: index },
        { $set: {
            deleted: true
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateWorkreport != null){
        res.status(200).end()
    }else{
        console.log('null')
        res.status(404).end()
    }
})





export default router