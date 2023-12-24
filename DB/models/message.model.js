import { Schema, model } from "mongoose";



const messageSchema = new Schema({
    contant:{
        type:String,
        required:true
    },
    sendTo:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    isviewed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Message = model('message',messageSchema)

export default Message