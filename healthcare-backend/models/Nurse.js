import mongoose from "mongoose";


const nurseSchema = new mongoose.Schema(

{

// Link with User Account

user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},




// Personal Information

name:{

type:String,

required:true,

trim:true

},



email:{

type:String,

required:true,

unique:true

},



phone:{

type:String

},



gender:{

type:String,

enum:[

"Male",

"Female",

"Other"

]

},




// Professional Information

qualification:{

type:String,

default:"GNM"

},



experience:{

type:Number,

default:0

},



licenseNumber:{

type:String

},




// Hospital Information

department:{

type:String,

default:"General Ward"

},



hospitalName:{

type:String

},





// Work Schedule

shift:{

type:String,

enum:[

"Morning",

"Evening",

"Night"

],

default:"Morning"

},



availability:{

type:String,

enum:[

"Available",

"Busy",

"Leave"

],

default:"Available"

},




// Assigned Doctor

assignedDoctor:{

type:mongoose.Schema.Types.ObjectId,

ref:"Doctor"

},




// Assigned Patients

assignedPatients:[

{

type:mongoose.Schema.Types.ObjectId,

ref:"Patient"

}

],





// Profile Status

status:{

type:String,

enum:[

"Active",

"Inactive"

],

default:"Active"

}



},

{

timestamps:true

}

);



export default mongoose.model(

"Nurse",

nurseSchema

);
