import express from 'express'
import router from './Routes/movieRouter.js';
import error from './Middleware/error.js';
import userRouter from './Routes/userRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser())


app.use("/v1/movies",router)
app.use("/v1/movies",userRouter)


app.use(error)
export default app;