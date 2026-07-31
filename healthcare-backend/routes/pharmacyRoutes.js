import express from "express";


import {

getMedicines,
getMedicineById,
createMedicine,
updateMedicine,
updateStock,
deleteMedicine,
getLowStockMedicines

}
from "../controllers/pharmacyController.js";


import {

protect

}
from "../middleware/authMiddleware.js";


import {

authorize

}
from "../middleware/roleMiddleware.js";



const router = express.Router();





// View medicines
// Admin + Doctor + Nurse

router.get(

"/",

protect,

authorize(
"admin",
"doctor",
"nurse"
),

getMedicines

);





// Low stock medicines

router.get(

"/low-stock",

protect,

authorize("admin"),

getLowStockMedicines

);






// Single medicine

router.get(

"/:id",

protect,

getMedicineById

);






// Add medicine

router.post(

"/",

protect,

authorize("admin"),

createMedicine

);






// Update medicine

router.put(

"/:id",

protect,

authorize("admin"),

updateMedicine

);






// Update stock

router.patch(

"/:id/stock",

protect,

authorize("admin"),

updateStock

);






// Delete medicine

router.delete(

"/:id",

protect,

authorize("admin"),

deleteMedicine

);




export default router;