// routes/adminRoutes.js
import express from "express";
import { downloadAlumniExcel } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/download", downloadAlumniExcel);

export default router;
//arya added this