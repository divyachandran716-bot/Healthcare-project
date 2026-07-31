import express from "express";

import {
getVitalSigns,
createVitalSign
}
from "../controllers/vitalController.js";


import {
protect
}
from "../middleware/authMiddleware.js";


const router=express.Router();



router.get(
"/",
protect,
getVitalSigns
);



router.post(
"/",
protect,
createVitalSign
);



export default router;