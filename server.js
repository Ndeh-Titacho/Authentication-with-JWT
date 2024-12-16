import express from 'express'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import router from './routes/responds.js'
import router01 from './routes/userRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // If you are using cookies or HTTP authentication
}));


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/', router)
app.use('/api/users',router01 )
app.use(errorHandler)



app.listen(port, ()=> console.log(`Server is running on port ${port}`))