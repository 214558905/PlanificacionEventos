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
exports.editCareerById = exports.createCareer = exports.getAllCareeers = void 0;
const careers_1 = __importDefault(require("../models/careers"));
const sequelize_1 = require("sequelize");
const getAllCareeers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield careers_1.default.findAll({
            order: [['updatedAt', 'DESC']],
        });
        res.status(200).json(careers);
    }
    catch (error) {
        res.status(400).json({ message: '¡Ups! Ocurrió un error' });
    }
});
exports.getAllCareeers = getAllCareeers;
const createCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const sameCarer = yield careers_1.default.findOne({
            where: {
                name,
            }
        });
        if (sameCarer) {
            res.status(400).json({ message: 'No pueden existir dos carreras con el mismo nombre' });
            return;
        }
        yield careers_1.default.create({
            name
        });
        res.status(200).json({ message: 'Carrera creado' });
    }
    catch (error) {
    }
});
exports.createCareer = createCareer;
const editCareerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { careerId } = req.params;
        const { name } = req.body;
        const sameCarer = yield careers_1.default.findOne({
            where: {
                name,
                careerId: { [sequelize_1.Op.not]: careerId }
            }
        });
        if (sameCarer) {
            res.status(400).json({ message: 'No pueden existir dos carreras con el mismo nombre' });
            return;
        }
        const career = yield careers_1.default.findByPk(careerId);
        if (!career) {
            res.status(400).json({ message: 'Facultad no encontrada' });
        }
        yield (career === null || career === void 0 ? void 0 : career.update({
            name
        }));
        res.status(200).json({ message: 'Carrera editada' });
    }
    catch (error) {
    }
});
exports.editCareerById = editCareerById;
