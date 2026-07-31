import VitalSign from "../models/VitalSign.js";


// CREATE VITAL SIGN

export const createVitalSign = async(req,res)=>{

try{

const vital =
await VitalSign.create({

patient:req.body.patient,

nurse:req.user.id,

bloodPressure:req.body.bloodPressure,

pulse:req.body.pulse,

temperature:req.body.temperature,

oxygenLevel:req.body.oxygenLevel,

respiratoryRate:req.body.respiratoryRate,

remarks:req.body.remarks,

status:req.body.status

});


res.status(201).json({

success:true,

message:"Vital sign added successfully",

vital

});


}
catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};




// GET ALL VITAL SIGNS
export const getVitalSigns = async(req,res)=>{

try{


const vitals =
await VitalSign.find()
.populate("patient")
.sort({
createdAt:-1
});


res.status(200).json({

success:true,

count:vitals.length,

vitals

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};