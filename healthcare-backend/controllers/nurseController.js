import Nurse from "../models/Nurse.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import MedicalReport from "../models/MedicalReport.js";
import VitalSign from "../models/VitalSign.js";
import NursingNote from "../models/NursingNote.js";
import Medication from "../models/Medication.js";

// =================================
// GET ALL NURSES (ADMIN)
// =================================

export const getNurses = async(req,res)=>{

try{

const nurses = await Nurse.find()
.sort({
createdAt:-1
});


res.status(200).json({

success:true,

count:nurses.length,

nurses

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};





// =================================
// GET SINGLE NURSE
// =================================

export const getNurseById = async(req,res)=>{

try{


const nurse =
await Nurse.findById(req.params.id);



if(!nurse){

return res.status(404).json({

success:false,

message:"Nurse not found"

});

}



res.status(200).json({

success:true,

nurse

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};







// =================================
// CREATE NURSE
// =================================

export const createNurse = async(req,res)=>{

try{


const nurse =
await Nurse.create(req.body);



res.status(201).json({

success:true,

message:"Nurse created successfully",

nurse

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}

};







// =================================
// UPDATE NURSE
// =================================

export const updateNurse = async(req,res)=>{

try{


const nurse =
await Nurse.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!nurse){

return res.status(404).json({

success:false,

message:"Nurse not found"

});

}



res.status(200).json({

success:true,

message:"Nurse updated successfully",

nurse

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}

};








// =================================
// DELETE NURSE
// =================================

export const deleteNurse = async(req,res)=>{

try{


const nurse =
await Nurse.findByIdAndDelete(
req.params.id
);



if(!nurse){

return res.status(404).json({

success:false,

message:"Nurse not found"

});

}



res.status(200).json({

success:true,

message:"Nurse deleted successfully"

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};









// =================================
// NURSE DASHBOARD
// =================================

export const getNurseDashboard = async(req,res)=>{

try{


console.log("AUTH USER:",req.user);



// Find nurse using login email

const nurse =
await Nurse.findOne({

user:req.user.id

});



console.log("FOUND NURSE:",nurse);



if(!nurse){

return res.status(404).json({

success:false,

message:"Nurse profile not found"

});

}




const assignedPatients =
nurse.assignedPatients?.length || 0;





const criticalPatients =
await Patient.countDocuments({

_id:{
$in:nurse.assignedPatients
},

status:"Critical"

});





const appointments =
await Appointment.countDocuments({

patient:{
$in:nurse.assignedPatients
}

});





const reports =
await MedicalReport.countDocuments({

patient:{
$in:nurse.assignedPatients
}

});



// Vital Checks

const vitalChecks =
await VitalSign.countDocuments({

patient:{
$in:nurse.assignedPatients
}

});


const nursingNotes =
await NursingNote.countDocuments({

nurse:nurse._id

});

const medications =
await Medication.countDocuments({

patient:{
$in:nurse.assignedPatients
}

});


res.status(200).json({

success:true,

nurse:{
    name:nurse.name,
    department:nurse.department,
    availability:nurse.availability
},


dashboard:{


assignedPatients,

vitalChecks,

nursingNotes,

medications,

appointments,

reports,

criticalPatients


}


});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}

};










// =================================
// GET NURSE ASSIGNED PATIENTS
// =================================

export const getNursePatients = async(req,res)=>{

try{


console.log("AUTH USER:",req.user);



// Find nurse

const nurse =
await Nurse.findOne({

user:req.user.id

});



console.log("FOUND NURSE:",nurse);



if(!nurse){

return res.status(404).json({

success:false,

message:"Nurse profile not found"

});

}




const patients =
await Patient.find({

_id:{
$in:nurse.assignedPatients
}

})
.sort({

createdAt:-1

});





res.status(200).json({

success:true,

count:patients.length,

patients

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}

};

// =================================
// ASSIGN PATIENT TO NURSE
// =================================

export const assignPatientToNurse = async(req,res)=>{

try{

console.log("========== ASSIGN API ==========");
console.log("BODY:",req.body);



const {
nurseId,
patientId
}=req.body;



const nurse =
await Nurse.findById(nurseId);



console.log("FOUND NURSE:",nurse);



if(!nurse){

return res.status(404).json({

success:false,

message:"Nurse not found"

});

}



const patient =
await Patient.findById(patientId);



console.log("FOUND PATIENT:",patient);



if(!patient){

return res.status(404).json({

success:false,

message:"Patient not found"

});

}




if(!nurse.assignedPatients){

nurse.assignedPatients=[];

}




nurse.assignedPatients.push(patient._id);



await nurse.save();



return res.status(200).json({

success:true,

message:"Patient assigned successfully",

nurse

});


}
catch(error){

console.log("ASSIGN ERROR:",error);


return res.status(500).json({

success:false,

message:error.message

});


}

};

export const getNurseNotes = async(req,res)=>{

try{


const nurse =
await Nurse.findOne({

user:req.user.id

});


const notes =
await NursingNote.find({

nurse:nurse._id

})
.populate(
"patient",
"name status condition"
)
.sort({
createdAt:-1
});


res.json({

success:true,

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

export const createNursingNote = async(req,res)=>{

try{


const note =
await NursingNote.create({

patient:req.body.patient,

nurse:req.user.id,

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