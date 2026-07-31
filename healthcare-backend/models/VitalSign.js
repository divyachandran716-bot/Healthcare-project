import mongoose from "mongoose";


const vitalSignSchema = new mongoose.Schema({

patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:true
},


nurse:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Nurse",
    required:true
},


bloodPressure:{
    type:String
},


pulse:{
    type:Number
},


temperature:{
    type:Number
},


oxygenLevel:{
    type:Number
},


respiratoryRate:{
    type:Number
},


remarks:{
    type:String
},


status:{
    type:String,
    enum:[
        "Normal",
        "Monitoring",
        "Critical"
    ],
    default:"Normal"
}


},
{
timestamps:true
});


export default mongoose.model(
"VitalSign",
vitalSignSchema
);