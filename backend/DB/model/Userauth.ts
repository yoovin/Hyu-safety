import {Schema, Model, model} from 'mongoose'
import userauth from '../interface/userauth'

interface userauthModel extends Model<userauth>{}

const UserauthSchema = new Schema<userauth, userauthModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: String,
})

export default model<userauth, userauthModel>('Userauth', UserauthSchema)