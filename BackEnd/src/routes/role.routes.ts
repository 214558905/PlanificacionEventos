import { Router } from "express";
import { getAllRols } from "../controllers/roles.controllers";

const router = Router();

router.get('/getRols', getAllRols)

export default router;