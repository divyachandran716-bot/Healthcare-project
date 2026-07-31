import EmergencyAlert from "../models/EmergencyAlert.js";


// GET ALL ALERTS

export const getEmergencyAlerts = async(req,res)=>{

try{


const alerts =
await EmergencyAlert.find()
.populate("patient")
.sort({
createdAt:-1
});


res.json({

success:true,

alerts

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// CREATE ALERT

export const createEmergencyAlert = async(req,res)=>{

try{


const alert =
await EmergencyAlert.create(req.body);



res.status(201).json({

success:true,

alert

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};




// RESOLVE ALERT

export const resolveEmergencyAlert = async(req,res)=>{

try{


const alert =
await EmergencyAlert.findByIdAndUpdate(

req.params.id,

{
status:"Resolved"
},

{
new:true
}

);



res.json({

success:true,

alert

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};