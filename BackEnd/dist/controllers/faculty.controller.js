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
exports.editFacultyById = exports.createFaculties = exports.getAllFaculties = void 0;
const faculty_1 = __importDefault(require("../models/faculty"));
const sequelize_1 = require("sequelize");
const getAllFaculties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculties = yield faculty_1.default.findAll({
            order: [['updatedAt', 'DESC']],
        });
        res.status(200).json(faculties);
    }
    catch (error) {
        res.status(400).json({ message: 'Ups Ocurrio un Error' });
    }
});
exports.getAllFaculties = getAllFaculties;
const createFaculties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const sameCarer = yield faculty_1.default.findOne({
            where: {
                name,
            }
        });
        if (sameCarer) {
            res.status(400).json({ message: 'No pueden existir dos Facultades con el mismo nombre' });
            return;
        }
        yield faculty_1.default.create({
            name
        });
        res.status(200).json({ message: 'Facultad creada' });
    }
    catch (error) {
        res.status(400).json({ message: '!error', error });
    }
});
exports.createFaculties = createFaculties;
const editFacultyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { facultyId } = req.params;
        const { name } = req.body;
        const sameCarer = yield faculty_1.default.findOne({
            where: {
                name,
                facultyId: { [sequelize_1.Op.not]: facultyId }
            }
        });
        if (sameCarer) {
            res.status(400).json({ message: 'No pueden existir dos Facultades con el mismo nombre' });
            return;
        }
        const faculty = yield faculty_1.default.findByPk(facultyId);
        if (!faculty) {
            res.status(400).json({ message: 'Facultad no encontrada' });
        }
        yield (faculty === null || faculty === void 0 ? void 0 : faculty.update({
            name
        }));
        res.status(200).json({ message: 'Facultad editaad' });
    }
    catch (error) {
        res.status(400).json({ message: '!error', error });
    }
});
exports.editFacultyById = editFacultyById;
