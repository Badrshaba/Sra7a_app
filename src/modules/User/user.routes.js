import { Router } from "express";
import * as uC from './user.controller.js'
import expressAsyncHandler from "express-async-handler";
const router = Router()

router.post('/', expressAsyncHandler(uC.signUp))
router.post('/signin', expressAsyncHandler(uC.signIn))
router.put('/', expressAsyncHandler(uC.updateUser))
router.delete('/', expressAsyncHandler(uC.deletUser))
router.get('/:_id', expressAsyncHandler(uC.getUser))

export default router