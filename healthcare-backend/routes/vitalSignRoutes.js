import express from "express";

import {
createVitalSign,
getVitalSigns
}
from "../controllers/vitalSignController.js";


import {
protect
}
from "../middleware/authMiddleware.js";


const router = express.Router();



router.post(
"/",
protect,
createVitalSign
);



router.get(
"/",
protect,
getVitalSigns
);



export default router;