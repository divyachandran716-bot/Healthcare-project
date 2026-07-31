import mongoose from "mongoose";


const medicineSchema = new mongoose.Schema(

{

// Medicine Name

name:{

type:String,

required:true,

trim:true

},





// Medicine Category

category:{

type:String,

enum:[

"Tablet",

"Capsule",

"Syrup",

"Injection",

"Cream",

"Other"

],

default:"Tablet"

},





// Manufacturer Information

manufacturer:{

type:String

},





// Stock Information

stock:{

type:Number,

required:true,

default:0

},





// Minimum Stock Alert

minimumStock:{

type:Number,

default:10

},





// Medicine Price

price:{

type:Number,

default:0

},





// Expiry Date

expiry:{

type:Date,

required:true

},





// Batch Details

batchNumber:{

type:String

},





// Medicine Description

description:{

type:String

},





// Availability Status

status:{

type:String,

enum:[

"Available",

"Out of Stock",

"Expired"

],

default:"Available"

}





},

{

timestamps:true

}

);





export default mongoose.model(

"Medicine",

medicineSchema

);
