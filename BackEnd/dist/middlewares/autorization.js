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
exports.decodeToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token != undefined) {
        try {
            const tokens = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
            if (!(tokens.rol === 'Administrador')) {
                res.status(400).json({ message: 'Acesso denegado' });
            }
            next();
        }
        catch (error) {
            res.status(400).json({ message: 'Token no valido' });
        }
    }
    else {
        res.status(400).json({ message: 'Acesso denegado' });
    }
});
exports.verifyToken = verifyToken;
const decodeToken = (req, res) => {
    const tokens = req.headers.authorization;
    console.log(tokens);
    if (tokens) {
        try {
            const token = jsonwebtoken_1.default.verify(tokens, config_1.default.SECRET);
            res.json(token);
        }
        catch (error) {
            res.status(400).json({ message: 'Token inválido' });
        }
    }
    else {
        res.status(400).json({ message: 'Acceso denegado' });
    }
};
exports.decodeToken = decodeToken;
