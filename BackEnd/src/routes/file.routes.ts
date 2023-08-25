import { Router } from "express";
import multer from 'multer';
import { cargar, deleteFile, subirArchivo, subirArchivoEs, subirArchivoFacilitador } from "../controllers/files.controllers";

const router = Router();
const upload = multer({ dest: 'uploads/' });
router.post('/subir-archivo', upload.single('archivo'), subirArchivo);
router.delete('/deleteFile/:fileId', deleteFile)
router.post('/subir-archivoEs', upload.single('archivo'), subirArchivoEs);
router.put('/subir-archivoFacilitador/:idUser', upload.single('archivo'), subirArchivoFacilitador);
router.post('/cargar', upload.single('archivo'), cargar);

export default router;