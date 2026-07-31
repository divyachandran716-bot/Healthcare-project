import mongoose from "mongoose";


const prescriptionSchema = new mongoose.Schema(

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


medicine:{

type:String,

required:true

},


dosage:{

type:String,

required:true

},


duration:{

type:String,

required:true

},


status:{

type:String,

enum:[
"Active",
"Completed"
],

default:"Active"

}

},

{
timestamps:true
}

);



const Prescription = mongoose.model(
"Prescription",
prescriptionSchema
);


export default Prescription;