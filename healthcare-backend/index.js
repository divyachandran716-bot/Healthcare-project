import "dotenv/config";
import express from "express";
import cors from "cors";
// import dotenv from "dotenv";

import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import emergencyAlertRoutes from "./routes/emergencyAlertRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import vitalRoutes from "./routes/vitalRoutes.js";
import vitalSignRoutes from "./routes/vitalSignRoutes.js";
import nursingNoteRoutes from "./routes/nursingNoteRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import medicalReportRoutes from "./routes/medicalReportRoutes.js";


// dotenv.config();


connectDB();


const app = express();



app.use(cors());

app.use(express.json());





// Routes

app.use(
"/api/auth",
authRoutes
);


app.use(
"/api/patients",
patientRoutes
);


app.use(
"/api/doctors",
doctorRoutes
);


app.use(
"/api/nurses",
nurseRoutes
);


app.use(
"/api/appointments",
appointmentRoutes
);


app.use(
"/api/reports",
reportRoutes
);


app.use(
"/api/pharmacy",
pharmacyRoutes
);


app.use(
"/api/analytics",
analyticsRoutes
);

app.use(
"/api/ai",
aiRoutes
);

app.use(
"/api/prescriptions",
prescriptionRoutes
);

app.use(
"/api/emergency-alerts",
emergencyAlertRoutes
);

app.use(
"/api/vitals",
vitalRoutes
);

app.use(
"/api/vital-signs",
vitalSignRoutes
);

app.use(
"/api/nursing-notes",
nursingNoteRoutes
);

app.use(
"/api/medication",
medicationRoutes
);

app.use(
"/api/medical-reports",
medicalReportRoutes
);

app.use(
"/api/billing",
billingRoutes
);

app.get("/",(req,res)=>{

res.json({

success:true,

message:"Healthcare API Running"

});

});



// Error Handler

app.use((err,req,res,next)=>{


console.error(err.stack);


res.status(500).json({

success:false,

message:"Server Error"

});


});





const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{


console.log(
`🚀 Server running on port ${PORT}`
);


});