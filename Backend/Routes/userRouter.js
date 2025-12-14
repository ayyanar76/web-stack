import express from 'express'
import { deluser, login, logout, reguser } from '../Controllers.js/usercontrol.js';
import { isverifyuser } from '../Middleware/Auth.js';

const userRouter =express.Router()

userRouter.route('/regiester').post(reguser)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(logout)
userRouter.route('/deluser').delete(isverifyuser,deluser)


export default userRouter;