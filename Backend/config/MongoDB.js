import mongoose from "mongoose"

const connectDB = async()=>{
  await mongoose.connect(process.env.MONGO_URL)
  .then(console.log("DB CONNECTED"))
  .catch((err)=>{
    console.log("ERROR DETECTED:"+err)})
}

export default connectDB;