import mongoose from "mongoose";
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name"],
        minlength:[3,"Please Contain Name With More Than Charactors"],
        maxlength:[20,"Please Contain name with Fewer Than 20charactors "]
    },
    password:{
        type:String,
        minlength:8,
        required:true,
        validate:[validator.isStrongPassword,"Set Strong Passsword"],
        select:false
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Enter Valid Email Address"],
        unique:true
    },
    role:{
        type:String,
        default:"user"
    },
    resetpasswordToken:String,
    resetpasswordExpired:Date
},

{
    timestamps:true
})

userSchema.pre("save",async function(next){
     if(!this.isModified("password")){
        return next();
     }
     this.password = await bcryptjs.hash(this.password,10)
     return 
})


userSchema.methods.getToken =  function () {
     return jwt.sign({id:this._id.toString()},process.env.JWT_KEY,{expiresIn:process.env.EXPIRE_TOKEN})
}

userSchema.methods.checkpass = function(password){
    return bcryptjs.compare(password,this.password)
}


const users = mongoose.model("user",userSchema)
export default users;