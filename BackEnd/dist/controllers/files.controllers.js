"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargar = exports.deleteFile = exports.subirArchivoFacilitador = exports.subirArchivoEs = exports.subirArchivo = void 0;
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const files_1 = __importDefault(require("../models/files"));
const fileEsquema_1 = __importDefault(require("../models/fileEsquema"));
const fileFacilitador_1 = __importDefault(require("../models/fileFacilitador"));
const KEY_PATH = 'credentials/credentials.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: SCOPES
});
const drive = googleapis_1.google.drive({ version: 'v3', auth });
const carpetaPropuesta = '1zuS5l7K6q93gc7fP8EDHBeaRUxZxekUF';
const carpetaEsquema = '162bjTTN9LHiSkkftuAQRLzLjtaHBvayf';
const carpetaFacilitador = '1Gk0jjQmAR0lkVWdplo0qlvEA_LXh7pvG';
const subirArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const archivoParaSubir = req.file.path;
        const nombreArchivo = req.file.originalname;
        const archivoMetadata = {
            name: nombreArchivo,
            parents: [carpetaPropuesta],
        };
        const media = {
            mimeType: req.file.mimetype,
            body: fs_1.default.createReadStream(archivoParaSubir),
        };
        const response = yield drive.files.create({
            requestBody: archivoMetadata,
            media: media,
        });
        const id = response.data.id;
        if (id) {
            const responseG = yield drive.files.get({
                fileId: id,
                fields: 'name, webContentLink',
            });
            const name = responseG.data.name;
            const link = responseG.data.webContentLink;
            if (name && link) {
                yield files_1.default.create({
                    fileId: id,
                    name: name,
                    linkFile: link
                });
            }
        }
        else {
            res.status(400).json({ message: "No se pudo crear" });
        }
        fs_1.default.unlink(archivoParaSubir, (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
            }
            else {
                console.log('Archivo eliminado correctamente del sistema de archivos');
            }
        });
        res.status(200).json(id);
    }
    catch (error) {
        console.log('error al subir el archivo', error);
        res.status(500).json({ message: 'Error al subir el archivo' });
    }
});
exports.subirArchivo = subirArchivo;
const subirArchivoEs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const archivoParaSubir = req.file.path;
        const nombreArchivo = req.file.originalname;
        const archivoMetadata = {
            name: nombreArchivo,
            parents: [carpetaEsquema],
        };
        const media = {
            mimeType: req.file.mimetype,
            body: fs_1.default.createReadStream(archivoParaSubir),
        };
        const response = yield drive.files.create({
            requestBody: archivoMetadata,
            media: media,
        });
        const id = response.data.id;
        if (id) {
            const responseG = yield drive.files.get({
                fileId: id,
                fields: 'name, webContentLink',
            });
            const name = responseG.data.name;
            const link = responseG.data.webContentLink;
            if (name && link) {
                yield fileEsquema_1.default.create({
                    fileEsquemaId: id,
                    name: name,
                    linkFile: link
                });
            }
        }
        else {
            res.status(400).json({ message: "No se pudo crear" });
        }
        fs_1.default.unlink(archivoParaSubir, (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
            }
            else {
                console.log('Archivo eliminado correctamente del sistema de archivos');
            }
        });
        res.status(200).json(id);
    }
    catch (error) {
        console.log('error al subir el archivo', error);
        res.status(500).json({ message: 'Error al subir el archivo' });
    }
});
exports.subirArchivoEs = subirArchivoEs;
const subirArchivoFacilitador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const archivoParaSubir = req.file.path;
        const { idUser } = req.params;
        const nombreArchivo = req.file.originalname;
        const archivoMetadata = {
            name: nombreArchivo,
            parents: [carpetaFacilitador],
        };
        const media = {
            mimeType: req.file.mimetype,
            body: fs_1.default.createReadStream(archivoParaSubir),
        };
        const response = yield drive.files.create({
            requestBody: archivoMetadata,
            media: media,
        });
        const id = response.data.id;
        if (id) {
            const responseG = yield drive.files.get({
                fileId: id,
                fields: 'name, webContentLink',
            });
            const name = responseG.data.name;
            const link = responseG.data.webContentLink;
            const file = yield fileFacilitador_1.default.findOne({
                where: { idUser: idUser }
            });
            console.log(file);
            if (file) {
                if (file.fileid) {
                    yield drive.files.delete({ fileId: file.fileid });
                }
            }
            if (name && link) {
                yield fileFacilitador_1.default.update({
                    fileid: id,
                    name: name,
                    linkFile: link
                }, {
                    where: {
                        idUser: idUser
                    }
                });
            }
        }
        else {
            res.status(400).json({ message: "No se pudo crear" });
        }
        fs_1.default.unlink(archivoParaSubir, (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
            }
            else {
                console.log('Archivo eliminado correctamente del sistema de archivos');
            }
        });
        res.status(200).json(id);
    }
    catch (error) {
        console.log('error al subir el archivo', error);
        res.status(500).json({ message: 'Error al subir el archivo' });
    }
});
exports.subirArchivoFacilitador = subirArchivoFacilitador;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        yield drive.files.delete({ fileId: fileId });
        res.status(200).json({ message: 'Archivo Eliminado' });
    }
    catch (error) {
        res.status(400).json({ message: 'No se pudo eliminar el Archivo', error });
    }
});
exports.deleteFile = deleteFile;
const cargar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const archivoParaSubir = req.file.path;
        const nombreArchivo = req.file.originalname;
        const archivoMetadata = {
            name: nombreArchivo,
            parents: [carpetaFacilitador],
        };
        const media = {
            mimeType: req.file.mimetype,
            body: fs_1.default.createReadStream(archivoParaSubir),
        };
        const response = yield drive.files.create({
            requestBody: archivoMetadata,
            media: media,
        });
        const id = response.data.id;
        if (id) {
            const responseG = yield drive.files.get({
                fileId: id,
                fields: 'name, webViewLink ',
            });
            const { name, webViewLink } = responseG.data;
            const fileUrl = webViewLink === null || webViewLink === void 0 ? void 0 : webViewLink.replace('/view', '/preview');
            const responseData = {
                name,
                fileUrl,
            };
            res.status(200).json(responseData);
        }
        else {
            res.status(400).json({ message: "No se pudo crear" });
        }
        fs_1.default.unlink(archivoParaSubir, (error) => {
            if (error) {
                console.error('Error al eliminar el archivo:', error);
            }
            else {
                console.log('Archivo eliminado correctamente del sistema de archivos');
            }
        });
        res.status(200).json(id);
    }
    catch (error) {
        console.log('error al subir el archivo', error);
        res.status(500).json({ message: 'Error al subir el archivo' });
    }
});
exports.cargar = cargar;
