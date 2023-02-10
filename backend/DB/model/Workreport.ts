import {Schema, Model, model} from 'mongoose'
import workreport from '../interface/workreport'

interface workreportModel extends Model<workreport>{}

const WorkreportSchema = new Schema<workreport, workreportModel>({
    index: {type: Number, required: true, unique: true},
    id: {type: String, required: true},
    request_depart: {type: String, required: true},
    position: {type: String, required: true},
    name: {type: String, required: true},
    work_place: {type: String, required: true},
    work_content: {type: String, required: true},
    equipment_input: String,
    work_people: {type: Number, required: true},
    request: String,
    start_date: {type: String, required: true},
    end_date: {type: String, required: true},
    signfile_name: {type: String, required: true},
})

export default model<workreport, workreportModel>('Workreport', WorkreportSchema)