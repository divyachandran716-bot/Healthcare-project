import express from "express";

import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorDashboard,
  getDoctorProfile
} from "../controllers/doctorController.js";


import {
  protect
} from "../middleware/authMiddleware.js";


import {
  authorize
} from "../middleware/roleMiddleware.js";


const router = express.Router();



// Doctor Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("doctor"),
  getDoctorDashboard
);



// Doctor Profile
router.get(
  "/profile",
  protect,
  authorize("doctor"),
  getDoctorProfile
);



// Admin doctor management
router.get(
  "/",
  protect,
  getDoctors
);



// Get doctor by id (keep LAST)
router.get(
  "/:id",
  protect,
  getDoctorById
);



router.post(
  "/",
  protect,
  authorize("admin"),
  createDoctor
);



router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateDoctor
);



router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDoctor
);



export default router;