import { Router } from "express";
import { createFaculties, editFacultyById, getAllFaculties } from "../controllers/faculty.controller";
import { verifyToken } from "../middlewares/autorization";

const router = Router()

router.get('/getAllFaculties', getAllFaculties)
router.post('/createFaculty',verifyToken, createFaculties)
router.put('/editFaculty/:facultyId',verifyToken, editFacultyById)

export default router       