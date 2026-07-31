import Patient from "../models/Patient.js";
import Groq from "groq-sdk";

import Doctor from "../models/Doctor.js";
import Nurse from "../models/Nurse.js";
import Appointment from "../models/Appointment.js";
import MedicalReport from "../models/MedicalReport.js";
import Medicine from "../models/Medicine.js";
import EmergencyAlert from "../models/EmergencyAlert.js";
import Bill from "../models/Bill.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ""
});

// ===============================
// DASHBOARD ANALYTICS
// ===============================
export const getDashboardAnalytics = async (req, res) => {

try {


const patients =
await Patient.find();



const totalPatients =
patients.length;



const recovered =
patients.filter(
p => p.status === "Recovered"
).length;



const critical =
patients.filter(
p => p.status === "Critical"
).length;



const underTreatment =
patients.filter(
p => p.status === "Under Treatment"
).length;





const totalDoctors =
await Doctor.countDocuments();



const totalNurses =
await Nurse.countDocuments();



const totalAppointments =
await Appointment.countDocuments();



// Appointment Status Analytics

const pending =
await Appointment.countDocuments({
status:"Pending"
});


const completed =
await Appointment.countDocuments({
status:"Completed"
});


const cancelled =
await Appointment.countDocuments({
status:"Cancelled"
});





const totalReports =
await MedicalReport.countDocuments();



const totalMedicines =
await Medicine.countDocuments();



const activeEmergency =
await EmergencyAlert.countDocuments({

status:"Active"

});





res.json({

success:true,


analytics:{


totalPatients,

totalDoctors,

totalNurses,


totalAppointments,


// ADD THESE

pending,

completed,

cancelled,



totalReports,

totalMedicines,


activeEmergency,


recovered,

critical,

underTreatment


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

// ===============================
// AI INSIGHTS
// ===============================

export const getAIInsights = async (req,res)=>{

try{


const patients = await Patient.find();


const total = patients.length;


const recovered = patients.filter(
p=>p.status==="Recovered"
).length;


const critical = patients.filter(
p=>p.status==="Critical"
).length;



const prompt = `
You are a healthcare AI analyst.

Total patients: ${total}

Recovered patients: ${recovered}

Critical patients: ${critical}

Give a short healthcare analytics insight.
`;



const completion =
await groq.chat.completions.create({

messages:[
{
role:"user",
content:prompt
}
],

model:"llama-3.1-8b-instant"

});



res.json({

success:true,

insight:
completion.choices[0].message.content

});


}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:"AI insight failed"

});

}


};





// ===============================
// PATIENT RISK ANALYSIS
// ===============================


export const getRiskAnalysis = async(req,res)=>{


try{


const patients =
await Patient.find();



const risks = patients.map(patient=>{


let risk="Low";


if(patient.status==="Critical")
risk="High";


else if(patient.status==="Under Treatment")
risk="Medium";



return {

patient:patient.name,

risk

};


});



res.json({

success:true,

risks

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};






// ===============================
// DISEASE TREND
// ===============================


export const getDiseaseTrends = async(req,res)=>{


try{


const patients =
await Patient.find();



const diseases={};



patients.forEach(p=>{


if(p.disease){

diseases[p.disease] =
(diseases[p.disease] || 0)+1;

}


});



const trends =
Object.keys(diseases).map(disease=>({

disease,

prediction:
`${diseases[disease]} cases detected`

}));



res.json({

success:true,

trends

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};







// ===============================
// AI CHAT
// ===============================


export const chatWithAI = async(req,res)=>{


try{


const {message}=req.body;



const response =
await groq.chat.completions.create({

model:"llama-3.1-8b-instant",

messages:[

{
role:"user",
content:
`You are a healthcare assistant.
Answer safely:

${message}`
}

]


});



res.json({

reply:
response.choices[0].message.content

});


}

catch(error){

console.log(error);

res.status(500).json({

reply:
"AI unavailable"

});


}


};

// ===============================
// DISEASE ANALYTICS
// ===============================

export const getDiseaseAnalytics = async (req,res)=>{

try{

const patients = await Patient.find();


const diseaseCount={};


patients.forEach(patient=>{

if(patient.disease){

diseaseCount[patient.disease] =
(diseaseCount[patient.disease] || 0)+1;

}

});


const diseases = Object.keys(diseaseCount).map(
disease=>({

disease,

count:diseaseCount[disease]

})
);



res.json({

success:true,

diseases

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

// ===============================
// PATIENT ANALYTICS
// ===============================

export const getPatientAnalytics = async (req,res)=>{

try{

const patients = await Patient.find();


const totalPatients = patients.length;


const statusCount = {

Recovered:0,

"Under Treatment":0,

Critical:0

};



patients.forEach(patient=>{

if(statusCount[patient.status] !== undefined){

statusCount[patient.status]++;

}

});



res.json({

success:true,

patients:{

totalPatients,

statusCount

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