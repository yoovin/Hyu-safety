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
// router.get('/', async (req: Request, res: Response) => {
//     console.log(req.query)
//     // console.log(req.query.page)
//     if(req.query.reverse === '-1'){
//         await Suggestion.find(req.query).limit(10).sort({index: -1}).skip((Number(req.query.page)-1)*10).limit(10)
//         .then(async data => {
//             const count = await Suggestion.countDocuments(req.query)
//             res.send({notices: data, count: count})
//         })
//     }else{
//         Suggestion.find(req.query)
//         .then(async data => {
//             const count = await Suggestion.countDocuments(req.query)
//             res.send({notices: data, count: count})
//         })
//     }
// })

// router.get('/detail', async (req: Request, res: Response) => {
//     let sendData: any = {}
//     await Suggestion.findOne({index: req.query.index})
//     .then(data => {
//         // Object.assign(sendData, data)
//         sendData.info = data
//     })
//     await Suggestiondesc.findOne({index: req.query.index})
//     .then(data => {
//         // Object.assign(sendData, data)
//         sendData.desc = data
//     })
//     res.send(sendData)
// })

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
    // console.log(req)
    // console.log(req)

    // let images = Object.assign(req.files!)
    // let newImages = new Array<string>
    // images?.map((item: any) => {
    //     newImages.push(`/workreport/${item.filename}`)
    // })

    const index = await getNextSequence("workreport")

    const newWorkreport = new Workreport({
        index: index,
        id: req.body.id,
        request_depart: req.body.requestDepart,
        position: req.body.position,
        name: req.body.name,
        work_place: req.body.workPlace,
        work_content: req.body.workContent,
        equipment_input: req.body.equipmentInput,
        work_people: parseInt(req.body.workPeople),
        request: req.body.request,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        signfile_name: req.file!.filename,
    })

    // const newSuggestionDesc = new Suggestiondesc({
    //     index: index,
    //     desc: req.body.desc,
    //     images: newImages
    // })

    newWorkreport.save((err: CallbackError, data) => {
        if(err) console.error(err)
            res.status(403).end()
        })

    // newSuggestion.save((err: CallbackError, data) => {
    //     if(err) console.error(err)
    //         res.status(403).end()
    //     })

    res.status(201).end()
})



// router.post('/status', async (req: Request, res: Response) => {
//     console.log(req.body)
//     const index = req.body.index
//     let updateSuggestion = await Suggestion.findOneAndUpdate(
//         { index: index },
//         { $set: {
//             checked: req.body.uploaded,
//             deleted: req.body.deleted
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