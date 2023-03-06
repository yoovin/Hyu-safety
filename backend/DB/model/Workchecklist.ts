import {Schema, Model, model} from 'mongoose'
import workchecklist from '../interface/workchecklist'

interface workchecklistModel extends Model<workchecklist>{}

const WorkchecklistSchema = new Schema<workchecklist, workchecklistModel>({
    index: Number,
    
    fire_checked: Array<boolean>,
    fire_reason: Array<string>,
    
    weight_checked: Array<boolean>,
    weight_reason: Array<string>,

    closed_checked: Array<boolean>,
    closed_reason: Array<string>,

    height_checked: Array<boolean>,
    height_reason: Array<string>,

    excavation_checked: Array<boolean>,
    excavation_reason: Array<string>,

    electricity_checked: Array<boolean>,
    electricity_reason: Array<string>,
})

export default model<workchecklist, workchecklistModel>('Workchecklist', WorkchecklistSchema)