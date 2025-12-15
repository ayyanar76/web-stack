import movies from "../Models/moviemodel.js"
import Handleerror from "../Middleware/Handleerror.js"
import Apihelper from "./Apicontroller.js"


 

export const Allmovies = async (req,res,next)=>{

 
 const Apifeature = new Apihelper(movies.find(),req.query).search()
 const allmovies = await Apifeature.query
 

    if(!allmovies){
         return next(new Handleerror("Something Went Wrong",401))
    }
    res.status(200).json({
        success:true,
        allmovies
    })
}

export const Addmovies = async (req,res,next)=>{
    const addmovies = await movies.create(req.body)

     if(!addmovies){
         return next(new Handleerror("Something Went Wrong",401))
    }
    res.status(201).json({
        success:true,
    message:"Movie Added",
    addmovies
    })
}

export const getmovie = async(req,res,next)=>{
    const id = req.params.id
   const getmovie = await movies.findById(id)
 if(!getmovie){
         return next(new Handleerror("Something Went Wrong",401))
    }
   res.status(200).json({
    success:true,
    getmovie
   })
}

export const updatemovie = async (req,res)=>{
    const id = req.params.id
    const updatemovie = await movies.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:movies
    })
    res.status(200).json({
        success:"Upadtae Succesfully",
        updatemovie
    })
}

export const deletemovie = async (req,res)=>{
    const {id} =req.params
    const deletemovie = await movies.findByIdAndDelete(id)
    res.status(200).json({
        success:"Deleted Successfully"
    })
}

