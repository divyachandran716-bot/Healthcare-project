import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema(

{

patient:{

type:mongoose.Schema.Types.ObjectId,

ref:"Patient",

required:true

},


doctor:{

type:mongoose.Schema.Types.ObjectId,

ref:"Doctor",

required:true

},



appointmentDate:{

type:Date,

required:true

},



time:{

type:String,

required:true

},



reason:{

type:String

},



status:{
 type:String,
 enum:[
 "Scheduled",
 "Pending",
 "Confirmed",
 "Completed",
 "Cancelled"
 ],
 default:"Scheduled"
}



},

{

timestamps:true

}

);



export default mongoose.model(
"Appointment",
appointmentSchema
);