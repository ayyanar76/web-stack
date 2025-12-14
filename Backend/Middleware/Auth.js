import  jwt  from 'jsonwebtoken'
import Handleerror from './Handleerror.js'
import users from '../Models/Usermodel.js'
export const isverifyuser = async(req,res,next)=>{
    const{token} = req.cookies

    if(!token){
        return next(new Handleerror("Incredenticital entry Access Denied",401))
    }
   const decoder = jwt.verify(token,process.env.JWT_KEY)


   req.user  = await users.findById(decoder.id)
   next()
}
export const rolebased = (...roles)=>{
    return (req,res,next)=>{
  if(!roles.includes(req.user.role)){
 return next(new Handleerror("This Page Only Access For Admin",401))
  }
  next()
}
}