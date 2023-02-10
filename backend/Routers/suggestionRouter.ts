import express, { Request, Response } from 'express'
import { CallbackError } from 'mongoose'
import multer from 'multer'
const router = express.Router()

// Models
import Suggestion from '../DB/model/Suggestion'
import Suggestiondesc from '../DB/model/Suggestiondesc'

import getNextSequence from '../DB/getNextSequence'

const upload = multer({
    dest: __dirname + '/uploads/suggestion/'
})

/*
    ===== GET =====
*/
router.get('/', async (req: Request, res: Response) => {
    console.log(req.query)
    // console.log(req.query.page)
    if(req.query.reverse === '-1'){
        await Suggestion.find(req.query).limit(10).sort({index: -1}).skip((Number(req.query.page)-1)*10).limit(10)
        .then(async data => {
            const count = await Suggestion.countDocuments(req.query)
            res.send({notices: data, count: count})
        })
    }else{
        Suggestion.find(req.query)
        .then(async data => {
            const count = await Suggestion.countDocuments(req.query)
            res.send({notices: data, count: count})
        })
    }
})

router.get('/detail', async (req: Request, res: Response) => {
    let sendData: any = {}
    await Suggestion.findOne({index: req.query.index})
    .then(data => {
        // Object.assign(sendData, data)
        sendData.info = data
    })
    await Suggestiondesc.findOne({index: req.query.index})
    .then(data => {
        // Object.assign(sendData, data)
        sendData.desc = data
    })
    res.send(sendData)
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

router.post('/upload', upload.array('file'), async (req: Request, res: Response) => {
    // files map 안되는거 고치기
    console.log(req.files)
    console.log(req.body)
    // const images = req.files as { [fieldname: string]: Express.Multer.File[] }
    let images = Object.assign(req.files!)
    let newImages = new Array<string>
    images?.map((item: any) => {
        newImages.push(`/suggestion/${item.filename}`)
    })

    const index = await getNextSequence("suggestion")
    const newSuggestion = new Suggestion({
        index: index,
        id: req.body.id,
        preview: req.body.desc.substring(0, 10)
    })

    const newSuggestionDesc = new Suggestiondesc({
        index: index,
        desc: req.body.desc,
        images: newImages
    })

    newSuggestionDesc.save((err: CallbackError, data) => {
        if(err) console.error(err)
            res.status(403).end()
        })

    newSuggestion.save((err: CallbackError, data) => {
        if(err) console.error(err)
            res.status(403).end()
        })

    res.status(201).end()
})



router.post('/status', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = req.body.index
    let updateSuggestion = await Suggestion.findOneAndUpdate(
        { index: index },
        { $set: {
            checked: req.body.uploaded,
            deleted: req.body.deleted
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateSuggestion != null){
        res.status(200).end()
    }else{
        console.log('null')
        console.log(updateSuggestion)
        res.status(404).end()
    }
})

router.post('/delete', async (req: Request, res: Response) => {
    console.log(req.body)
    const index = req.body.index
    let updateSuggestion = await Suggestion.findOneAndUpdate(
        { index: index },
        { $set: {
            deleted: true
            }
        },
        { returnNewDocument: true }
    ).exec()

    if(updateSuggestion != null){
        res.status(200).end()
    }else{
        console.log('null')
        console.log(updateSuggestion)
        res.status(404).end()
    }
})



export default router