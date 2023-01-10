import {Schema, Model, model} from 'mongoose'
import noticedesc from '../interface/noticedesc'

interface noticedescModel extends Model<noticedesc>{}

const NoticedescSchema = new Schema<noticedesc, noticedescModel>({
    index: Number,
    desc: String,
})

export default model<noticedesc, noticedescModel>('Noticedesc', NoticedescSchema)