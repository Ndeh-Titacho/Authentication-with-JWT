import express from 'express'
import { loginUser, registerUser, showUser } from '../controller/userController.js'
import { protect } from '../middlewares/authMiddleware.js'
const router01 = express.Router()


router01.post('/', registerUser )

router01.post('/login', loginUser )

router01.get('/me', protect,showUser )

export default router01
