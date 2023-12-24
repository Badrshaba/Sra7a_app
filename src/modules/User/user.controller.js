import User from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs'


//===================== sign up =====================//

export const signUp = async(req,res)=>{
    const { username,email,password } = req.body
    // is user name duplicate
    const userNameCheck = await User.findOne({username}) 
    if(userNameCheck) return res.status(400).json({message:"user name already exist "})
    // is email duplicate
    const emailCheck = await User.findOne({email})
    if(emailCheck) return res.status(400).json({message:"email already exist "})
    // hash password
    const hashPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    // create user
    const createUser = await User.create({username,email,password:hashPassword })
    if(createUser) return res.status(201).json({message:"sucess"})
}


//===================== sign in =====================//

export const signIn = async(req,res)=>{
    const {username,email,password}=req.body
    // check username or email
    const checkUser= await User.findOne({$or: [ {username} , {email}]})
    if(!checkUser) return res.status(400).json({message:"invalid login"})
    // check password
    const passwordMatch = bcrypt.compareSync(password,checkUser.password)
    if (!passwordMatch) return res.status(400).json({message:"invalid login"})
    // sucess case
    res.status(200).json({message:"sucess login"})
}


//===================== update user =====================//

export const updateUser = async(req,res)=>{
    const {username,email} = req.body
    const {_id,logerId} = req.query
    // user exist
    const userExist = User.findById(_id)
    if(!(_id==logerId&&userExist)) return res.status(400).json({message:"invalid update"})
    // username not exist
    if (username) {
        const userNameCheck = await User.findOne({username})
        if(userNameCheck) return res.status(400).json({message:"username already exist"})
    }
    // email not exist
    if (email) {
        const emailCheck = await User.findOne({email})
        if(emailCheck) return res.status(400).json({message:"email already exist"})
    }
    // update user
    const update = await User.updateOne({_id},{username,email})
    if (!update.modifiedCount) return res.status(400).json({message:"invalid update"})
    res.status(200).json({message:"sucess update"})
}


//===================== delete user =====================//

export const deletUser = async(req,res)=>{
    const {_id,logerId} = req.query
    // user exist
    const userExist = User.findById(_id)
    if(!(_id==logerId&&userExist)) return res.status(400).json({message:"invalid delete"})
    // delete user
    await User.deleteOne({_id})
    res.status(200).json({message:"sucess delete"})
}


//===================== get user =====================//

export const getUser = async (req,res)=>{
    const {_id}= req.params
    // get user
    const user = await User.findById(_id)
    if (!user) return res.status(400).json({message:"invalid"})
    res.status(200).json({message:"done",user})
}
