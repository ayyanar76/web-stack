import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    moviename:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        default:"Good Movie"
    },
    releaseDdate:{
        type:String,
        default:Date.now()+3
    },
    Cateagary:{
        type:String,
       default:"Adult"
    },
    Director:{
        type:String,
        default:"Unknown"
    },
    Cast:{
        Hero:{
            type:String,
            default:"Unknown Hero"
        },
        Heroine:{
            type:String,
            default:"Unknown Heroine"
        }
    }
})


const movies = mongoose.model("movie",movieSchema)
export default movies;