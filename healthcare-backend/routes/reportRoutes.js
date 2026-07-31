import express from "express";


import {

getReports,
getReportById,
createReport,
updateReport,
deleteReport,
getDoctorReports,
getPatientReports

}
from "../controllers/reportController.js";



import {

protect

}
from "../middleware/authMiddleware.js";



import {

authorize

}
from "../middleware/roleMiddleware.js";



const router = express.Router();




// ================================
// ALL REPORTS
// Admin + Nurse
// ================================

router.get(

"/",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

getReports

);





// ================================
// DOCTOR REPORTS
// ================================

router.get(

"/doctor",

protect,

authorize("doctor"),

getDoctorReports

);






// ================================
// PATIENT REPORTS
// ================================

router.get(

"/patient/:patientId",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

getPatientReports

);






// ================================
// SINGLE REPORT
// ================================

router.get(

"/:id",

protect,

getReportById

);







// ================================
// CREATE REPORT
// ================================

router.post(

"/",

protect,

authorize("doctor"),

createReport

);







// ================================
// UPDATE REPORT
// ================================

router.put(

"/:id",

protect,

authorize("doctor"),

updateReport

);







// ================================
// DELETE REPORT
// ================================

router.delete(

"/:id",

protect,

authorize("admin"),

deleteReport

);



export default router;