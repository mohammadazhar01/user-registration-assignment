import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './route/userRoutes.js';


const app = express()
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean)

await connectDB()

app.use(express.json());
app.use(cookieParser());



app.use(cors({origin: allowedOrigins, credentials: true}));

app.use('/api/user',userRouter )


app.listen(port, ()=> {
    console.log(`Server is ruunning on ${port}`)
})