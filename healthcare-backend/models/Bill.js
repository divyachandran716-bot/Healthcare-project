import mongoose from "mongoose";


const billSchema = new mongoose.Schema({

billNo:{
    type:String,
    unique:true,
    required:true
},


patient:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient",
    required:true
},


doctor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor"
},


medicines:[
{
    medicine:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medicine",
        required:true
    },

    name:String,

    quantity:{
        type:Number,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    amount:{
        type:Number,
        required:true
    }
}
],


subtotal:{
    type:Number,
    required:true
},


discount:{
    type:Number,
    default:0
},


tax:{
    type:Number,
    default:0
},


total:{
    type:Number,
    required:true
},


paymentMethod:{
    type:String,
    enum:["Cash","Card","UPI"],
    default:"Cash"
},


paymentStatus:{
    type:String,
    enum:["Paid","Pending"],
    default:"Paid"
}


},
{
timestamps:true
});



export default mongoose.model("Bill",billSchema);