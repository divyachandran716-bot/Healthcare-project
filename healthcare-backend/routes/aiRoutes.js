import express from "express";

import {
  chatWithAI
} from "../controllers/analyticsController.js";


const router = express.Router();



router.post(
  "/chat",
  chatWithAI
);



export default router;