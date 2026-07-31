import express from "express";


import {

getPatients,
getPatientById,
createPatient,
updatePatient,
deletePatient,
getDoctorPatients

}
from "../controllers/patientController.js";


import {

protect

}
from "../middleware/authMiddleware.js";


import {

authorize

}
from "../middleware/roleMiddleware.js";



const router = express.Router();





// =================================
// GET ALL PATIENTS
// Admin + Nurse
// =================================

router.get(

"/",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

getPatients

);







// =================================
// DOCTOR PATIENTS
// =================================

router.get(

"/doctor",

protect,

authorize("doctor"),

getDoctorPatients

);







// =================================
// GET SINGLE PATIENT
// =================================

router.get(

"/:id",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

getPatientById

);







// =================================
// CREATE PATIENT
// Admin + Doctor
// =================================

router.post(

"/",

protect,

authorize(
"admin",
"doctor"
),

createPatient

);







// =================================
// UPDATE PATIENT
// Admin + Doctor + Nurse
// =================================

router.put(

"/:id",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

updatePatient

);







// =================================
// DELETE PATIENT
// Admin Only
// =================================

router.delete(

"/:id",

protect,

authorize("admin"),

deletePatient

);



export default router;
