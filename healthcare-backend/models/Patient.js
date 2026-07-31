import mongoose from "mongoose";


const patientSchema = new mongoose.Schema(

{

// Personal Information

name:{

type:String,

required:true,

trim:true

},


age:{

type:Number,

required:true

},


gender:{

type:String,

enum:[
"Male",
"Female",
"Other"
],

required:true

},



phone:{

type:String

},



email:{

type:String

},



address:{

type:String

},






// Medical Information


disease:{

type:String,

required:true

},



bloodGroup:{

type:String

},



condition:{

type:String

},



status:{

type:String,

enum:[

"Recovered",

"Treatment",

"Critical",

"Admitted",

"Stable"

],

default:"Treatment"

},






// Assigned Doctor


doctor:{

type:mongoose.Schema.Types.ObjectId,

ref:"Doctor"

},






// Emergency Details


emergencyContact:{

name:String,

phone:String

},






// Vitals


bloodPressure:{

type:String

},


temperature:{

type:String

},


heartRate:{

type:Number

},






// Additional Notes


medicalHistory:{

type:String

},


notes:{

type:String

}



},

{

timestamps:true

}

);



export default mongoose.model(

"Patient",

patientSchema

);
