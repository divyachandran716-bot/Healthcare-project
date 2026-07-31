import express from "express";

import {

getEmergencyAlerts,
createEmergencyAlert,
resolveEmergencyAlert

}
from "../controllers/emergencyAlertController.js";


import {protect} from "../middleware/authMiddleware.js";


const router = express.Router();



router.get(
"/",
protect,
getEmergencyAlerts
);



router.post(
"/",
protect,
createEmergencyAlert
);



router.put(
"/:id",
protect,
resolveEmergencyAlert
);



export default router;