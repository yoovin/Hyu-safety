import mongoose from "mongoose"

const connectDB: Function = () => {
    mongoose.connect("mongodb://localhost/HYU_safety")
}

export default connectDB