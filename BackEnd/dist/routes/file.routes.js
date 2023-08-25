"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const files_controllers_1 = require("../controllers/files.controllers");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/subir-archivo', upload.single('archivo'), files_controllers_1.subirArchivo);
router.delete('/deleteFile/:fileId', files_controllers_1.deleteFile);
router.post('/subir-archivoEs', upload.single('archivo'), files_controllers_1.subirArchivoEs);
router.put('/subir-archivoFacilitador/:idUser', upload.single('archivo'), files_controllers_1.subirArchivoFacilitador);
router.post('/cargar', upload.single('archivo'), files_controllers_1.cargar);
exports.default = router;
