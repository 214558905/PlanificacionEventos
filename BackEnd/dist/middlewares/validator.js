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
exports.checkExistinigUserbyId = exports.checkExistingUser = void 0;
const sequelize_1 = require("sequelize");
const users_1 = __importDefault(require("../models/users"));
const checkExistingUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield users_1.default.findOne({ where: { cedula: req.body.cedula } });
        if (userFound) {
            return res.status(400).json({ message: "Ya hay un usario registrado con esta cedula" });
        }
        const userFound2 = yield users_1.default.findOne({ where: { email: req.body.email } });
        if (userFound2) {
            return res.status(400).json({ message: "Ya hay un usuario registrado con este email" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.checkExistingUser = checkExistingUser;
const checkExistinigUserbyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula, email } = req.body;
        const idUser = req.params.idUser;
        const user = yield users_1.default.findOne({ where: { idUser: idUser } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Verificar si el nuevo email ya existe en otro usuario
        const existingUser = yield users_1.default.findOne({ where: { email, idUser: { [sequelize_1.Op.ne]: idUser } } });
        if (existingUser) {
            // El nuevo email ya está asociado a otro usuario
            return res.status(409).json({ message: 'El email ya está en uso por otro usuario' });
        }
        const existingUserCedula = yield users_1.default.findOne({ where: { cedula, idUser: { [sequelize_1.Op.ne]: idUser } } });
        if (existingUserCedula) {
            //La cedula ya está asociado a otro usuario
            return res.status(409).json({ message: 'La cedula ya está en uso por otro usuario' });
        }
        next();
    }
    catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ message: 'Error de clave foránea' });
        }
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});
exports.checkExistinigUserbyId = checkExistinigUserbyId;
