import mongoose from "mongoose";


const emergencyAlertSchema = new mongoose.Schema(
{

patient:{
type:mongoose.Schema.Types.ObjectId,
ref:"Patient",
required:true
},


message:{
type:String,
required:true
},


severity:{
type:String,
enum:[
"Low",
"Medium",
"High",
"Critical"
],
default:"High"
},


status:{
type:String,
enum:[
"Active",
"Resolved"
],
default:"Active"
},


createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}


},
{
timestamps:true
}
);



export default mongoose.model(
"EmergencyAlert",
emergencyAlertSchema
);