import {Schema, Model, model} from 'mongoose'
import suggestiondesc from '../interface/suggestiondesc'

interface suggestiondescModel extends Model<suggestiondesc>{}

const SuggestiondescSchema = new Schema<suggestiondesc, suggestiondescModel>({
    index: Number,
    desc: String,
    images: Array<string>
})

export default model<suggestiondesc, suggestiondescModel>('Suggestiondesc', SuggestiondescSchema)