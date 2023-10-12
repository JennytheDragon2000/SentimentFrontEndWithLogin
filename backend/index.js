import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
import morgan from "morgan";
import Admin from './Routes/AdminRoute.js'
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(morgan('dev'));

dotenv.config()
app.use(cors());
mongoose.connect(process.env.DB, {
    useNewUrlParser:true
})
.then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening at ${process.env.PORT}`)))
.catch((err)=>console.log(err))

app.use('/admin',Admin)
