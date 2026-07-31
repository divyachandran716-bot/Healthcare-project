import MedicalReport from "../models/MedicalReport.js";
import Doctor from "../models/Doctor.js";

// =================================
// GET ALL MEDICAL REPORTS
// =================================

export const getReports = async(req,res)=>{

try{


const reports = await MedicalReport.find()
.populate(
"patient",
"name age gender"
)
.populate(
"doctor",
"name specialization"
)
.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:reports.length,

reports

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
// GET SINGLE REPORT
// =================================

export const getReportById = async(req,res)=>{

try{


const report = await MedicalReport.findById(

req.params.id

)

.populate("patient")

.populate("doctor");



if(!report){

return res.status(404).json({

success:false,

message:"Medical report not found"

});

}



res.status(200).json({

success:true,

report

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
// CREATE MEDICAL REPORT
// =================================

export const createReport = async(req,res)=>{


try{


const doctor = await Doctor.findOne({

user:req.user.id

});


if(!doctor){

return res.status(404).json({

success:false,

message:"Doctor profile not found"

});

}



const report = await MedicalReport.create({

patient:req.body.patient,

doctor:doctor._id,

title:req.body.title,

reportType:req.body.reportType,

diagnosis:req.body.diagnosis,

symptoms:req.body.symptoms,

treatment:req.body.treatment,

medications:req.body.medications,

testResults:req.body.testResults,

remarks:req.body.remarks,

status:req.body.status || "Pending"

});



res.status(201).json({

success:true,

message:"Medical report created successfully",

report

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
// UPDATE MEDICAL REPORT
// =================================

export const updateReport = async(req,res)=>{


try{


const report = await MedicalReport.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true,

runValidators:true

}

);



if(!report){

return res.status(404).json({

success:false,

message:"Report not found"

});

}



res.status(200).json({

success:true,

message:"Medical report updated successfully",

report

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
// DELETE MEDICAL REPORT
// =================================

export const deleteReport = async(req,res)=>{


try{


const report =
await MedicalReport.findByIdAndDelete(

req.params.id

);



if(!report){

return res.status(404).json({

success:false,

message:"Report not found"

});

}



res.status(200).json({

success:true,

message:"Report deleted successfully"

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
// DOCTOR REPORTS
// =================================
export const getDoctorReports = async(req,res)=>{

try{


const doctor =
await Doctor.findOne({
 user:req.user.id
});


if(!doctor){

return res.status(404).json({
success:false,
message:"Doctor profile not found"
});

}



const reports = await MedicalReport.find({
 doctor:req.user.id
})
.populate(
"patient",
"name age gender"
)
.populate(
"doctor",
"name specialization"
)
.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:reports.length,

reports

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
// PATIENT REPORTS
// =================================

export const getPatientReports = async(req,res)=>{


try{


const reports = await MedicalReport.find({

patient:req.params.patientId

})

.populate("doctor")

.sort({

createdAt:-1

});



res.status(200).json({

success:true,

reports

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};
