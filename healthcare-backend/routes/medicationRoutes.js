import express from "express";

import {

createMedication,
getMedications

}
from "../controllers/medicationController.js";


import {
protect
}
from "../middleware/authMiddleware.js";


const router = express.Router();



router.post(
"/",
protect,
createMedication
);



router.get(
"/",
protect,
getMedications
);



export default router;