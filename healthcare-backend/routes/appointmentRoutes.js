import express from "express";


import {

getAppointments,
getAppointmentById,
createAppointment,
updateAppointment,
deleteAppointment,
getDoctorAppointments,
updateAppointmentStatus

}
from "../controllers/appointmentController.js";


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
// ADMIN VIEW ALL
// ================================

router.get(

"/",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

getAppointments

);





// ================================
// DOCTOR APPOINTMENTS
// ================================

router.get(

"/doctor",

protect,

authorize("doctor"),

getDoctorAppointments

);





// ================================
// SINGLE APPOINTMENT
// ================================

router.get(

"/:id",

protect,

getAppointmentById

);






// ================================
// CREATE
// ================================

router.post(

"/",

protect,

authorize(
"admin",
"doctor"
),

createAppointment

);






// ================================
// UPDATE
// ================================

router.put(

"/:id",

protect,

authorize(
"admin",
"doctor"
),

updateAppointment

);






// ================================
// UPDATE STATUS
// ================================

router.patch(

"/:id/status",

protect,

authorize("doctor"),

updateAppointmentStatus

);






// ================================
// DELETE
// ================================

router.delete(

"/:id",

protect,

authorize("admin"),

deleteAppointment

);




export default router;
