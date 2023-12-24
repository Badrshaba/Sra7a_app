import { Router } from "express";
import * as mC from './message.controller.js'
import asyncHandler from "express-async-handler";
const router = Router()

router.post('/:sendTo',asyncHandler(mC.sendMessage))
router.delete('/',asyncHandler(mC.deleteMessage))
router.put('/',asyncHandler(mC.messageView))
router.get('/get',asyncHandler(mC.listMessageUser))
export default router