import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/MongoDB.js';


process.on("uncaughtException",(err)=>{
    console.log(`This Error Detected By uncaughtException:${err}`);
        process.exit(1)
  
})
dotenv.config({path:'Backend/config/.env'})
const port = process.env.PORT || 3000
connectDB()






const server = app.listen(port,()=>{
    console.log(`Server is Running On http://localhost:${port}`);  
})

process.on("unhandledRejection",(err)=>{
    console.log(`This Error Detected By unHandle Rejection:${err}`);
    server.close(()=>{
        process.exit(1)
    }) 
})