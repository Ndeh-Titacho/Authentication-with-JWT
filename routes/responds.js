import express from 'express'
const router = express.Router()
import {deleteResponse, getResponse, setResponse, updateResponse} from '../controller/resController.js'
import {protect} from '../middlewares/authMiddleware.js'


router.get('/', protect, getResponse)

router.post('/',protect, setResponse)

router.put('/:id',protect, updateResponse)

router.delete('/:id',protect, deleteResponse)

export default router
