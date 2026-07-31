import express from "express";


import {

getNurses,
getNurseById,
createNurse,
updateNurse,
deleteNurse,
getNurseDashboard,
getNursePatients,
assignPatientToNurse,
getNurseNotes, 
createNursingNote

}
from "../controllers/nurseController.js";


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
// NURSE DASHBOARD
// =================================

router.get(
"/dashboard",
protect,
authorize("nurse"),
getNurseDashboard
);



// =================================
// NURSE ASSIGNED PATIENTS
// =================================

router.get(
"/patients",
protect,
authorize("nurse"),
getNursePatients
);




// =================================
// NURSE NOTES
// IMPORTANT: ABOVE /:id
// =================================

router.get(
"/notes",
protect,
authorize("nurse"),
getNurseNotes
);

router.post(
"/notes",
protect,
authorize("nurse"),
createNursingNote
);



// =================================
// ASSIGN PATIENT TO NURSE
// ADMIN ONLY
// =================================

router.put(
"/assign-patient",
protect,
authorize("admin"),
assignPatientToNurse
);





// =================================
// ADMIN NURSE MANAGEMENT
// =================================


// Get all nurses

router.get(
"/",
protect,
authorize("admin"),
getNurses
);




// Create nurse

router.post(
"/",
protect,
authorize("admin"),
createNurse
);





// =================================
// SINGLE NURSE
// KEEP THIS LAST
// =================================

router.get(
"/:id",
protect,
getNurseById
);





// Update nurse

router.put(
"/:id",
protect,
authorize("admin"),
updateNurse
);




// Delete nurse

router.delete(
"/:id",
protect,
authorize("admin"),
deleteNurse
);



export default router;