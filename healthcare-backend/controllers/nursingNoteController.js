import NursingNote from "../models/NursingNote.js";
import Nurse from "../models/Nurse.js";

// CREATE NOTE

export const createNursingNote = async(req,res)=>{

try{


const note =
await NursingNote.create({

patient:req.body.patient,

nurse:nurse._id,

observation:req.body.observation,

patientCondition:req.body.patientCondition

});


res.status(201).json({

success:true,

message:"Nursing note created",

note

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};




// GET NURSE NOTES
export const getNurseNotes = async(req,res)=>{

try{


const notes =
await NursingNote.find({

nurse:req.user.id

})
.populate(
"patient",
"name age disease status"
)
.sort({
createdAt:-1
});


res.status(200).json({

success:true,

count:notes.length,

notes

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};