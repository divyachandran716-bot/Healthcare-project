import express from "express";

import {
createBill,
getBills,
getBillById,
deleteBill
} from "../controllers/billingController.js";


import {
protect
} from "../middleware/authMiddleware.js";


import {
authorize
} from "../middleware/roleMiddleware.js";


const router = express.Router();



// =========================
// CREATE BILL
// =========================

router.post(
"/",
protect,

(req,res,next)=>{

console.log(
"BILLING USER:",
req.user
);

next();

},

authorize(
"admin",
"nurse"
),

createBill
);





// =========================
// GET ALL BILLS
// =========================

router.get(
"/",
protect,

authorize(
"admin",
"nurse"
),

getBills
);





// =========================
// GET SINGLE BILL
// =========================

router.get(
"/:id",
protect,

authorize(
"admin",
"nurse"
),

getBillById
);





// =========================
// DELETE BILL
// =========================

router.delete(
"/:id",
protect,

authorize(
"admin"
),

deleteBill
);



export default router;