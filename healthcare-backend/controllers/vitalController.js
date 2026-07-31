import VitalSign from "../models/VitalSign.js";


// GET ALL VITAL SIGNS

export const getVitalSigns = async(req,res)=>{

try{


const vitals =
await VitalSign.find()
.populate(
"patient",
"name age disease status"
)
.populate(
"nurse",
"name email"
)
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




// CREATE VITAL SIGN

export const createVitalSign = async(req,res)=>{

try{


const {
patient,
nurse,
bloodPressure,
pulse,
temperature,
oxygenLevel,
respiratoryRate,
remarks,
status
}=req.body;



const vital =
await VitalSign.create({

patient,
nurse,
bloodPressure,
pulse,
temperature,
oxygenLevel,
respiratoryRate,
remarks,
status

});



res.status(201).json({

success:true,

message:"Vital added successfully",

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