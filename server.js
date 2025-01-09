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

// Parse incoming JSON requests
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Define routes
app.use('/api/', router)
app.use('/api/users',router01 )

//Display all request made to server
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});


// Custom error handler
app.use(errorHandler)



// Start the server
app.listen(port, ()=> console.log(`Server is running on port ${port}`))