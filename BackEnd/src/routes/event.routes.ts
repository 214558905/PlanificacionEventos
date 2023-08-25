import { Router } from "express";
import { createEvent, editEventById, getAllEvents } from "../controllers/events.controller";
import { verifyToken } from "../middlewares/autorization";

const router = Router()

router.get('/getAllEvents', getAllEvents)
router.post('/createEvent',verifyToken, createEvent)
router.put('/editEvent/:eventId',verifyToken, editEventById)
export default router; 