import { Schema, model } from "mongoose";




const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    isconfirme:{
        type:Boolean,
        default:false
    },
    profilePictrue:String
},{
    timestamps:true
})

const User = model('user',userSchema)

export default User