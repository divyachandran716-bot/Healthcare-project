import Appointment from "../models/Appointment.js";

// =================================
// GET ALL APPOINTMENTS
// =================================

export const getAppointments = async(req,res)=>{

try{


const appointments =
await Appointment.find()
.populate("patient")
.populate("doctor")
.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:appointments.length,

appointments

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
// GET SINGLE APPOINTMENT
// =================================

export const getAppointmentById = async(req,res)=>{

try{


const appointment =
await Appointment.findById(
req.params.id
)
.populate("patient")
.populate("doctor");



if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment not found"

});

}



res.status(200).json({

success:true,

appointment

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
// CREATE APPOINTMENT
// =================================

export const createAppointment = async(req,res)=>{


try{


const appointment =
await Appointment.create(
req.body
);



res.status(201).json({

success:true,

message:"Appointment created successfully",

appointment

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
// UPDATE APPOINTMENT
// =================================

export const updateAppointment = async(req,res)=>{


try{


const appointment =
await Appointment.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment not found"

});

}



res.status(200).json({

success:true,

message:"Appointment updated successfully",

appointment

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
// DELETE APPOINTMENT
// =================================

export const deleteAppointment = async(req,res)=>{


try{


const appointment =
await Appointment.findByIdAndDelete(
req.params.id
);



if(!appointment){

return res.status(404).json({

success:false,

message:"Appointment not found"

});

}



res.status(200).json({

success:true,

message:"Appointment deleted successfully"

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
// DOCTOR APPOINTMENTS
// =================================

export const getDoctorAppointments = async(req,res)=>{


try{


const appointments =
await Appointment.find({

doctor:req.user.id

})
.populate("patient")
.sort({
date:1
});



res.status(200).json({

success:true,

appointments

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
// UPDATE APPOINTMENT STATUS
// =================================

export const updateAppointmentStatus = async(req,res)=>{


try{


const appointment =
await Appointment.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{
new:true
}

);



res.status(200).json({

success:true,

message:"Status updated",

appointment

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};
