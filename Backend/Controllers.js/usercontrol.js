import Handleerror from "../Middleware/Handleerror.js";
import users from "../Models/Usermodel.js"
import { logintoken, sendToken } from "./token.js";



export  const reguser = async (req,res)=>{
   const user = await users.create(req.body)

   sendToken(user,201,res)

}

export const login = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new Handleerror("Email or Password Doesn't Provieded.",401))
    }
   const user = await users.findOne({email}).select("+password")

   const isvalidPassword = await user.checkpass(password)
 
  
    if(!isvalidPassword){
        return next(new Handleerror("Email or Password Invalied",401))
    }
    if(isvalidPassword){
        logintoken(user,200,res)
    }
}

export const logout = async (req,res,next)=>{
     const option = {
        expire:new Date(Date.now()),
        httpOnly:true
     }
     res.status(200).cookie("token",null,option).json({
        success:true,
        message:"Logout Succesfully"
     })
}

export const deluser =  async(req,res,next)=>{
    


   
    const user = await users.findByIdAndDelete(req.user._id)
        if(!user){
        return next(new Handleerror("The User Doesn't Exist",404))
    }

     const option = {
        expire:new Date(Date.now()),
        httpOnly:true
     }
     res.status(200).cookie("token",null,option).json({
        success:true,
        message:"Account Deleted"
     })
     
}