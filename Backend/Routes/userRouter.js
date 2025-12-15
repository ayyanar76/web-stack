import express from 'express'
import { deluser, login, logout, reguser,forgetpasssword } from '../Controllers.js/usercontrol.js';
import {  isverifyuser } from '../Middleware/Auth.js';

const userRouter =express.Router()

userRouter.route('/regiester').post(reguser)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(logout)
userRouter.route('/deluser').delete(isverifyuser,deluser)
userRouter.route('/forgetpassword').post(forgetpasssword)


export default userRouter;