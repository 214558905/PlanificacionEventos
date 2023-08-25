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
exports.getAllRols = void 0;
const roles_1 = __importDefault(require("../models/roles"));
const getAllRols = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield roles_1.default.findAll({
            where: {
                name: 'Docente'
            }
        });
        res.status(200).json(careers);
    }
    catch (error) {
        res.status(400).json({ message: '¡Ups! Ocurrió un error' });
    }
});
exports.getAllRols = getAllRols;
