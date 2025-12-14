export const sendToken =(user,statuscode,res,next)=>{
     const token = user.getToken();
    if(!user || !token){
    return next(new Handleerror("User or Token Doesn't Create tryagain later..."))
}
const option = {expire:new Date(Date.now()+process.env.EXPIRE_TOKEN*24*60*60*100),httpOnly:true}

    res.status(statuscode).cookie("token",token,option).json({
        success:true,
        message:"user Created",
        user,
        token
    })
}

export const logintoken =(user,statuscode,res,next)=>{
     const token = user.getToken();
    if(!user || !token){
    return next(new Handleerror("User or Token Doesn't Create tryagain later..."))
}
const option = {expire:new Date(Date.now()+process.env.EXPIRE_TOKEN*24*60*60*100),httpOnly:true}

    res.status(statuscode).cookie("token",token,option).json({
        success:true,
        message:"Login Successfuly",
        user,
        token
    })
}

