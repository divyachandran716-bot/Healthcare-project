import express from "express";


import {

getMedicalReports,
createMedicalReport,
getMedicalReportById,
updateReportStatus

}
from "../controllers/medicalReportController.js";


const router = express.Router();




// GET ALL

router.get(
"/",
getMedicalReports
);



// CREATE

router.post(
"/",
createMedicalReport
);



// SINGLE REPORT

router.get(
"/:id",
getMedicalReportById
);



// UPDATE STATUS

router.put(
"/:id/status",
updateReportStatus
);



export default router;