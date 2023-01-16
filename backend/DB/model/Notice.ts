import {Schema, Model, model} from 'mongoose'
import notice from '../interface/notice'

interface noticeModel extends Model<notice>{}

const NoticeSchema = new Schema<notice, noticeModel>({
    index: Number,
    title: String,
    author: String,
    subject: String,
    upload_date: {type: Date, required: true, default: () => Date.now() + (540 * 60 * 1000)}, // 한국 표준시
    uploaded: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false}
})

export default model<notice, noticeModel>('Notice', NoticeSchema)