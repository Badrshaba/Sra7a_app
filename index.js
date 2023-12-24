import express from "express"
import db_connection from "./DB/connection.js"
import userRouter from './src/modules/User/user.routes.js'
import messageRouter from './src/modules/Message/message.routes.js'
import { config } from "dotenv"
import { globalResponse } from "./src/modules/Middlewares/globalResponse.js"
config()
const app = express()
app.use(express.json())
app.use('/user',userRouter)
app.use('/message',messageRouter)

app.use(globalResponse)

db_connection()
app.listen(process.env.PORT,()=>{
    console.log("server running........");
})