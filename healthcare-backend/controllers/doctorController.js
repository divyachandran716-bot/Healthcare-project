import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import MedicalReport from "../models/MedicalReport.js";
import Prescription from "../models/Prescription.js";



// =================================
// GET DOCTOR PROFILE
// =================================

export const getDoctorProfile = async(req,res)=>{

try{


const doctor = await Doctor.findOne({

user:req.user.id

})
.populate(
  "user",
  "name email"
);



if(!doctor){

return res.status(404).json({

success:false,

message:"Doctor profile not found"

});

}



res.status(200).json({

success:true,

doctor

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
// DOCTOR DASHBOARD
// =================================

export const getDoctorDashboard = async(req,res)=>{

try{


console.log("USER:",req.user);


// Find doctor profile
const doctor = await Doctor.findOne({
 email:req.user.email
});
console.log("Doctor",doctor);


if(!doctor){

return res.status(404).json({

success:false,
message:"Doctor profile not found"

});

}



// Patient count

const patients =
await Patient.countDocuments({
    doctor: doctor._id
});



console.log("PATIENT COUNT:",patients);



const appointments = await Appointment.countDocuments({
    doctor: doctor._id
});

const doctorReports = await MedicalReport.find({
    doctor: doctor._id
});


console.log(
"CURRENT DOCTOR ID:",
doctor._id.toString()
);


console.log(
"REPORT COUNT:",
doctorReports.length
);


const reports = doctorReports.length;

// console.log("DOCTOR ID:", doctor._id);
// console.log("REPORT COUNT:", reports);


// const allReports = await MedicalReport.find();

// console.log(
// "ALL REPORT DOCTORS:",
// allReports.map(r=>r.doctor)
// );



const prescriptions =
await Prescription.countDocuments({
    doctor: doctor._id
});



res.status(200).json({

success:true,

dashboard:{

patients,
appointments,
reports,
prescriptions,
recovery:0

}

});


}
catch(error){


console.log(
"Dashboard Error:",
error.message
);


res.status(500).json({

success:false,

message:error.message

});


}

};





// =================================
// GET LOGGED DOCTOR PATIENTS
// =================================


export const getDoctorPatients = async(req,res)=>{


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




const patients =
await Patient.find({

doctor:doctor._id

})

.populate(

"doctor",

"name specialization department"

)

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


console.log(
"PATIENT FETCH ERROR:",
error.message
);



res.status(500).json({

success:false,

message:error.message

});


}


};

// =================================
// CREATE DOCTOR
// =================================

export const createDoctor = async(req,res)=>{

try{


const {
name,
email,
phone,
gender,
specialization,
qualification,
experience,
licenseNumber,
department,
hospitalName,
availability,
shift,
status

}=req.body;



const existingUser =
await User.findOne({
email
});


if(existingUser){

return res.status(400).json({

success:false,

message:"Email already registered"

});

}



const hashedPassword =
await bcrypt.hash(
"123456",
10
);



const user =
await User.create({

name,

email,

password:hashedPassword,

role:"doctor"

});




const doctor =
await Doctor.create({

user:user._id,

name,

email,

phone,

gender,

specialization,

qualification,

experience,

licenseNumber,

department,

hospitalName,

availability,

shift,

status

});




res.status(201).json({

success:true,

message:"Doctor created successfully",

doctor

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
// GET ALL DOCTORS
// =================================

export const getDoctors = async(req,res)=>{

try{


const doctors =
await Doctor.find()
.sort({
createdAt:-1
});


res.status(200).json({

success:true,

count:doctors.length,

doctors

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
// GET SINGLE DOCTOR
// =================================

export const getDoctorById = async(req,res)=>{

try{


const doctor =
await Doctor.findById(
req.params.id
);



if(!doctor){

return res.status(404).json({

success:false,

message:"Doctor not found"

});

}



res.status(200).json({

success:true,

doctor

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
// UPDATE DOCTOR
// =================================

export const updateDoctor = async(req,res)=>{

try{


const doctor =
await Doctor.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!doctor){

return res.status(404).json({

success:false,

message:"Doctor not found"

});

}



res.status(200).json({

success:true,

message:"Doctor updated successfully",

doctor

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
// DELETE DOCTOR
// =================================

export const deleteDoctor = async(req,res)=>{

try{


const doctor =
await Doctor.findByIdAndDelete(
req.params.id
);



if(!doctor){

return res.status(404).json({

success:false,

message:"Doctor not found"

});

}



res.status(200).json({

success:true,

message:"Doctor deleted successfully"

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};