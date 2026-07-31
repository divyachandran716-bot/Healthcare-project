import express from "express";

import {
createNursingNote,
getNurseNotes
}
from "../controllers/nursingNoteController.js";


import {
protect
}
from "../middleware/authMiddleware.js";


import {
authorize
}
from "../middleware/roleMiddleware.js";


const router=express.Router();



router.post(
"/",
protect,
authorize("nurse"),
createNursingNote
);



router.get(
"/",
protect,
authorize("nurse"),
getNurseNotes
);



export default router;