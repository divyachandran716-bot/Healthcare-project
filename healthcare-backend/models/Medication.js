import mongoose from "mongoose";


const medicationSchema = new mongoose.Schema({

patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:true
},


medicine:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Medicine",
    required:true
},


dosage:{
    type:String,
    required:true
},


frequency:{
    type:String,
    default:"Morning"
},


status:{
    type:String,
    enum:[
        "Pending",
        "Given",
        "Completed"
    ],
    default:"Pending"
},


assignedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}


},
{
timestamps:true
});


export default mongoose.model(
"Medication",
medicationSchema
);