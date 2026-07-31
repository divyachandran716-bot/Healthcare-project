import mongoose from "mongoose";


const nursingNoteSchema = new mongoose.Schema({

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


observation:{
    type:String,
    required:true
},


patientCondition:{
    type:String,
    enum:[
        "Stable",
        "Recovering",
        "Critical",
        "Improving",
        "Recovered"

    ],
    default:"Stable"
}


},
{
timestamps:true,
collection:"nursingnotes"
});


export default mongoose.model(
"NursingNote",
nursingNoteSchema
);