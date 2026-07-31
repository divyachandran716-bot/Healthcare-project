import Medication from "../models/Medication.js";


// CREATE MEDICATION ASSIGNMENT

export const createMedication = async(req,res)=>{

try{


const medication =
await Medication.create({

patient:req.body.patient,

medicine:req.body.medicine,

dosage:req.body.dosage,

frequency:req.body.frequency,

status:req.body.status || "Pending",

assignedBy:req.user.id

});


res.status(201).json({

success:true,

message:"Medication assigned successfully",

medication

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};




// GET ALL MEDICATIONS

export const getMedications = async(req,res)=>{

try{


const medications =
await Medication.find()

.populate("patient")

.populate("medicine")

.sort({
createdAt:-1
});



res.json({

success:true,

count:medications.length,

medications

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};