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
exports.changePassword = exports.signIn = void 0;
const users_1 = __importDefault(require("../models/users"));
const roles_1 = __importDefault(require("../models/roles"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula, password } = req.body;
        const userFound = yield users_1.default.findOne({ where: { cedula: req.body.cedula } });
        if (!userFound)
            return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        const matchPassword = yield users_1.default.comparePassword(req.body.password, userFound.password);
        if (!matchPassword)
            return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
        let nombre = yield getRol(userFound.idRol);
        if (cedula === password) {
            const tokenbody = {
                cedula: userFound.cedula
            };
            const reset = jsonwebtoken_1.default.sign(tokenbody, config_1.default.SECRET, {
                expiresIn: '10m'
            });
            return res.status(200).json({ reset });
        }
        const token = jsonwebtoken_1.default.sign(tokenBody(userFound, nombre), config_1.default.SECRET, {
            expiresIn: '1d',
        });
        if (!userFound.estado) {
            return res.status(400).json({ message: "Acceso denegado, contactese con el administrador" });
        }
        res.status(200).json({ token });
        res.send("el token ha sido creado correctamente");
    }
    catch (error) {
    }
});
exports.signIn = signIn;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetToken = req.headers.reset;
        const { newPassword } = req.body;
        if (!resetToken) {
            res.status(400).json({ message: "!Ups ocurrio un error" });
        }
        let jwtPayload;
        jwtPayload = jsonwebtoken_1.default.verify(resetToken, config_1.default.SECRET);
        const user = yield users_1.default.findOne({ where: {
                cedula: jwtPayload.cedula
            } });
        if (!user) {
            res.status(400).json({ message: "Usuario non encontrado" });
        }
        const encryptedPassword = yield users_1.default.encryptPassword(newPassword);
        yield (user === null || user === void 0 ? void 0 : user.update({
            password: encryptedPassword
        }));
        res.status(200).json({ message: 'Acceso correcto' });
    }
    catch (error) {
        res.status(400).json({ message: "!Ups ocurrio un error", error });
    }
});
exports.changePassword = changePassword;
const tokenBody = (user, name) => {
    return {
        id: user.idUser,
        name: user.name,
        lastname: user.lastname,
        cedula: user.cedula,
        rol: name
    };
};
const getRol = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield roles_1.default.findOne({ where: { idRol: id } });
    let name;
    if (rol) {
        name = rol.name;
    }
    return name;
});
