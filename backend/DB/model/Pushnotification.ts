import {Schema, Model, model} from 'mongoose'
import pushnotification from '../interface/pushnotification'

interface pushnotificationModel extends Model<pushnotification>{}

const PushnotificationSchema = new Schema<pushnotification, pushnotificationModel>({
    index: Number,
    id: Array<String>,
    title: String,
    desc: String,
    upload_date: {type: Date, required: true, default: () => Date.now() + (540 * 60 * 1000)}, // 한국 표준시
    condition: {type: Boolean, default: true},
    condition_reason: String
})

export default model<pushnotification, pushnotificationModel>('Pushnotification', PushnotificationSchema)