import express, { Request, Response } from 'express'
import { CallbackError } from 'mongoose'
import multer from 'multer'
const router = express.Router()

// Models
import Workreport from '../DB/model/Workreport'

import getNextSequence from '../DB/getNextSequence'

const upload = multer({
    dest: __dirname + '/uploads/workreport/'
})

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
    // await Suggestiondesc.findOne({index: req.query.index})
    // .then(data => {
    //     // Object.assign(sendData, data)
    //     sendData.desc = data
    // })
    // res.send(sendData)
})

/*
    ===== POST =====
*/

// router.post('/update', async (req: Request, res: Response) => {
//     console.log(req.body)
//     const index = req.body.index
//     let updateSuggestion = await Notice.findOneAndUpdate(
//         { index: index },
//         { $set: {
//             title: req.body.title,
//             author: req.body.author,
//             subject: req.body.subject,
//             }
//         },
//         { returnNewDocument: true }
//     ).exec()

//     let updateSuggestionDesc = await Noticedesc.findOneAndUpdate(
//         { index: index },
//         { $set: {
//             desc: req.body.desc,
//             }
//         },
//         { returnNewDocument: true }
//     ).exec()

//     if(updateSuggestion != null && updateSuggestionDesc != null){
//         res.status(200).end()
//     }else{
//         console.log('null')
//         console.log(updateSuggestion, updateSuggestionDesc)
//         res.status(404).end()
//     }
// })

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    // const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file!
    // console.log(req.file)
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

// router.post('/delete', async (req: Request, res: Response) => {
//     console.log(req.body)
//     const index = req.body.index
//     let updateSuggestion = await Suggestion.findOneAndUpdate(
//         { index: index },
//         { $set: {
//             deleted: true
//             }
//         },
//         { returnNewDocument: true }
//     ).exec()

//     if(updateSuggestion != null){
//         res.status(200).end()
//     }else{
//         console.log('null')
//         console.log(updateSuggestion)
//         res.status(404).end()
//     }
// })



export default router