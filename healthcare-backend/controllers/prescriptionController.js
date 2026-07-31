import Prescription from "../models/Prescription.js";


// CREATE PRESCRIPTION

export const createPrescription = async(req,res)=>{

try{


const prescription =
await Prescription.create(req.body);


res.status(201).json({

success:true,

message:"Prescription created successfully",

prescription

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};





// GET ALL PRESCRIPTIONS

export const getPrescriptions = async(req,res)=>{

try{


const prescriptions =
await Prescription.find()

.populate("patient")

.populate("doctor")

.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:prescriptions.length,

prescriptions

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};