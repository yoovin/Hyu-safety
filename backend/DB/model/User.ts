import {Schema, Model, model} from 'mongoose'
import user from '../interface/user'

// import { AutoIncrementSimple } from '@typegoose/auto-increment'

interface userModel extends Model<user>{}

const UserSchema = new Schema<user, userModel>({
    // usernum: Number,
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: String,
    name: String,
    email: String,
    phone: String,
    position: {type: String, default: "worker"},
    // recent_login_ip: {type: String, default: ''},
    // recent_login_date: {type: Date},
    created_at: {type: Date, required: true, default: () => Date.now() + (540 * 60 * 1000)} // 한국 표준시
})
// UserSchema.plugin(AutoIncrementSimple, [{field: 'usernum'}])

export default model<user, userModel>('User', UserSchema)