import MedicalReport from "../models/MedicalReport.js";


// ================================
// GET ALL MEDICAL REPORTS
// ================================

export const getMedicalReports = async(req,res)=>{

try{


const reports = await MedicalReport.find()

.populate(
"patient",
"name"
)

.populate(
"doctor",
"name department"
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






// ================================
// CREATE MEDICAL REPORT
// ================================


export const createMedicalReport = async(req,res)=>{


try{


const report =
await MedicalReport.create(req.body);



res.status(201).json({

success:true,

message:"Medical report created",

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







// ================================
// GET SINGLE REPORT
// ================================


export const getMedicalReportById = async(req,res)=>{


try{


const report =

await MedicalReport.findById(
req.params.id
)

.populate(
"patient",
"name"
)

.populate(
"doctor",
"name"
);



if(!report){

return res.status(404).json({

success:false,

message:"Report not found"

});

}



res.json({

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






// ================================
// UPDATE REPORT STATUS
// ================================


export const updateReportStatus = async(req,res)=>{


try{


const report =

await MedicalReport.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{
new:true
}

);



res.json({

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