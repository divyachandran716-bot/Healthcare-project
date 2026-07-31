import express from "express";

import {
    getDashboardAnalytics,
    getDiseaseAnalytics,
    getPatientAnalytics,
    getAIInsights,
    getRiskAnalysis,
    getDiseaseTrends
} from "../controllers/analyticsController.js";


const router = express.Router();


router.get(
    "/dashboard",
    getDashboardAnalytics
);


router.get(
    "/diseases",
    getDiseaseAnalytics
);


router.get(
    "/patients",
    getPatientAnalytics
);


router.get(
    "/ai",
    getAIInsights
);

router.get(
    "/risk-analysis",
    getRiskAnalysis
);

router.get(
    "/disease-trends",
    getDiseaseTrends
);

export default router;