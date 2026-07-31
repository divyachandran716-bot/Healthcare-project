import mongoose from "mongoose";


const medicalReportSchema = new mongoose.Schema(

{

// Patient Reference

patient:{

type:mongoose.Schema.Types.ObjectId,

ref:"Patient",

required:true

},





// Doctor Reference

doctor:{

type:mongoose.Schema.Types.ObjectId,

ref:"Doctor",

required:true

},





// Report Information

title:{

type:String,

required:true,

trim:true

},



reportType:{

type:String,

enum:[

"Blood Test",

"X-Ray",

"MRI",

"ECG Report",

"CT Scan",

"General Checkup",

"Other"

],

default:"General Checkup"

},





// Medical Details

diagnosis:{

type:String,

required:true

},



symptoms:{

type:String

},



treatment:{

type:String

},



medications:[

{

name:String,

dosage:String,

duration:String

}

],






// Test Results

testResults:{

type:String

},





// Doctor Notes

remarks:{

type:String

},






// Report File

reportFile:{

type:String

},






// Report Status

status:{

type:String,

enum:[

"Pending",

"Reviewed",
"Critical",

"Completed"

],

default:"Pending"

}




},

{

timestamps:true

}

);



export default mongoose.model(

"MedicalReport",

medicalReportSchema

);
