import {Schema, Model, model} from 'mongoose'
import user from '../interface/user'

interface userModel extends Model<user>{}

const UserSchema = new Schema<user, userModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: String,
    name: String,
    email: String,
    phone: String,
    recent_login_ip: {String, default: ''},
    recent_login_date: {Date}
})

export default model<user, userModel>('User', UserSchema)