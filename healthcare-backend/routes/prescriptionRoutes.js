import express from "express";

import {
    createPrescription,
    getPrescriptions
} from "../controllers/prescriptionController.js";

import {
    protect
} from "../middleware/authMiddleware.js";


const router = express.Router();


// CREATE PRESCRIPTION
router.post(
    "/",
    protect,
    createPrescription
);


// GET PRESCRIPTIONS
router.get(
    "/",
    protect,
    getPrescriptions
);


export default router;