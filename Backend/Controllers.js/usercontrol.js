import Handleerror from "../Middleware/Handleerror.js";
import users from "../Models/Usermodel.js"
import { logintoken, sendToken } from "./token.js";
import crypto from 'crypto'



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

export const logout = async (req,res)=>{
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


export const forgetpasssword = async(req,res,next)=>{
   

  const user = await users.findOne({email:req.body.email})
  if(!user){
return  next(new Handleerror("The User Not Found", 404));
  
  }
  const resetToken = crypto.randomBytes(20).toString("hex")
     user.resetpasswordToken = crypto.createHash('sha256').update(resetToken),
    user.resetpasswordExpired = Date.now() + 15*60*1000

    await user.save({validateBeforeSave:false})

    const resetUrl = `${req.protocol}://${req.get("host")}/v1/password/reset/:${resetToken}`

    res.status(200).json({
      success:true,
      message:"Reset link Sent",
      resetUrl
    })
}