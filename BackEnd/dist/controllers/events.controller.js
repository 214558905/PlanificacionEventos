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
exports.editEventById = exports.createEvent = exports.getAllEvents = void 0;
const sequelize_1 = require("sequelize");
const events_1 = __importDefault(require("../models/events"));
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield events_1.default.findAll({
            order: [['updatedAt', 'DESC']],
        });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(400).json({ message: '¡Ups! Ocurrió un error' });
    }
});
exports.getAllEvents = getAllEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const sameEvent = yield events_1.default.findOne({
            where: {
                name,
            }
        });
        if (sameEvent) {
            res.status(400).json({ message: 'No pueden existir dos eventos con el mismo nombre' });
            return;
        }
        yield events_1.default.create({
            name
        });
        res.status(200).json({ message: 'Evento creado' });
    }
    catch (error) {
        res.status(400).json({ message: '!error', error });
    }
});
exports.createEvent = createEvent;
const editEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const { name } = req.body;
        const sameEvent = yield events_1.default.findOne({
            where: {
                name,
                eventId: { [sequelize_1.Op.not]: eventId }
            }
        });
        if (sameEvent) {
            res.status(400).json({ message: 'No pueden existir dos eventos con el mismo nombre' });
            return;
        }
        const event = yield events_1.default.findByPk(eventId);
        if (!event) {
            res.status(400).json({ message: 'Facultad no encontrada' });
        }
        yield (event === null || event === void 0 ? void 0 : event.update({
            name
        }));
        res.status(200).json({ message: 'Evento editado' });
    }
    catch (error) {
        res.status(400).json({ message: '!error', error });
    }
});
exports.editEventById = editEventById;
