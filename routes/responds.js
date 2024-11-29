import express from 'express'
const router = express.Router()
import {getResponse, setResponse} from '../controller/resController.js'


router.get('/', getResponse)

router.post('/', setResponse)


export default router
