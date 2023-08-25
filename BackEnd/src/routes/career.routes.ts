import { Router } from "express";
import { createCareer, editCareerById, getAllCareeers } from "../controllers/career.controllers";
import { verifyToken } from "../middlewares/autorization";

const router = Router();

router.get('/getCareers', getAllCareeers)
router.post('/createCareer',verifyToken, createCareer)
router.put('/editCareer/:careerId',verifyToken, editCareerById)

export default router; 