import {Schema, Model, model} from 'mongoose'
import suggestion from '../interface/suggestion'

interface suggestionModel extends Model<suggestion>{}

const SuggestionSchema = new Schema<suggestion, suggestionModel>({
    index: Number,
    id: String,
    preview: String,
    upload_date: {type: Date, required: true, default: () => Date.now() + (540 * 60 * 1000)}, // 한국 표준시
    checked: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false}
})

export default model<suggestion, suggestionModel>('Suggestion', SuggestionSchema)