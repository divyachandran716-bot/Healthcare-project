import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    specialization:{
        type:String,
        default:"General Medicine"
    },

    phone:{
        type:String,
        default:""
    },

    experience:{
        type:Number,
        default:0
    },

    qualification:{
        type:String,
        default:"MBBS"
    }

},
{
    timestamps:true
});


export default mongoose.model("Doctor",doctorSchema);