import { createDocument, findDocumentById } from "../../../DB/db_methods.js"
import Message from "../../../DB/models/message.model.js"
import User from "../../../DB/models/user.model.js"

 
//===================== create message =====================//

export const sendMessage = async (req,res)=>{
    const {contant} = req.body
    const {sendTo} = req.params
    // user check 
    const isUserExists = await findDocumentById(User,sendTo)
    if(!isUserExists.sucess)return res.status(isUserExists.status).json({message:isUserExists.message})
    // create message
    const createMessage = await createDocument(Message,{contant,sendTo})
    if(!createMessage.sucess) return res.status(createMessage.status).json({message:createMessage.message})
    res.status(201).json({message:"created"})
}
 

//===================== delete message =====================//

export const deleteMessage = async (req,res)=>{
    const {logInUserId,messageId} =req.query
    // check message
    const isMessageExist = await findDocumentById(Message,messageId)
    if(!isMessageExist.sucess) return res.status(isMessageExist.status).json({message:isMessageExist.message})
    //delete message
    const deletedMessage = await Message.findOneAndDelete({_id:messageId,sendTo:logInUserId})
    if(!deletedMessage) return res.status(400).json({message:"faild delete this message"})
    res.status(200).json({message:"deleted sucess"})
}


//===================== mark message as view =====================//

export const messageView = async (req,res)=>{
    const {logInUserId,messageId} = req.query
    // message check
    const isMessageExist = await findDocumentById(Message,messageId)
    if(!isMessageExist.sucess) return res.status(isMessageExist.status).json({message:isMessageExist.message})
    // update view
    const updateMessage = await Message.findOneAndUpdate({_id:messageId,sendTo:logInUserId,isviewed:false},
        {isviewed:true,$inc:{__v:1}},{new:true})
    if(!updateMessage) return res.status(400).json({message:" update faild"})
    res.status(200).json({message:"update done"})
}


//===================== list user messages =====================//

export const listMessageUser = async (req,res)=>{
    const {logInUserId,isviewed} = req.query
    // check user
    const user = await findDocumentById(User,logInUserId)
    if(!user.sucess) return res.status(user.status).json({message:user.message})
    // find messages
    const message = await Message.find({sendTo:logInUserId,isviewed}).sort({createdAt:-1})
    if (!message.length)  return res.status(200).json({message:"empty"})
    
    res.status(200).json({message})
}