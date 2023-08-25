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
exports.updateUserById = exports.enviarCredencialesPorCorreo = exports.createUser = exports.sendEmailChangePassword = exports.updateProfile = exports.deleteUserById = exports.getUserById = exports.getAllUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const roles_1 = __importDefault(require("../models/roles"));
const careers_1 = __importDefault(require("../models/careers"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sequelize_1 = require("sequelize");
const fileFacilitador_1 = __importDefault(require("../models/fileFacilitador"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.findAll({
            order: [['updatedAt', 'DESC']],
            where: {
                cedula: {
                    [sequelize_1.Op.ne]: '0106518491'
                }
            },
            include: [{
                    model: careers_1.default,
                    as: 'career',
                    attributes: ['name']
                }, {
                    model: roles_1.default,
                    as: 'roles',
                    attributes: ['name'],
                }]
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        const user = yield users_1.default.findByPk(idUser);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(400).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        return null; // Retorna null en caso de error
    }
});
exports.getUserById = getUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    yield users_1.default.destroy({ where: { idUser: idUser } })
        .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            res.status(200).json({ message: "Registro eliminado correctamente" });
        }
        else {
            res.status(400).json({ message: "Usuario no encontrado" });
        }
    })
        .catch((error) => {
        console.error('Error al eliminar el registro:', error);
    });
});
exports.deleteUserById = deleteUserById;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        const { fechaNacimiento, nacionalidad, direccion, telefono, educacion, experienciaProfesional, foto, name, lastname, cedula, } = req.body;
        const userFound = yield users_1.default.findByPk(idUser);
        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        yield userFound.update({
            fechaNacimiento,
            nacionalidad,
            direccion,
            telefono,
            educacion,
            experienciaProfesional,
            foto,
            name,
            lastname,
            cedula,
        });
        return res.status(200).json({ message: 'Perfil Actualizado' });
    }
    catch (error) {
        return res.status(500).json({ message: '¡Ups no se pudo actualizar', error });
    }
});
exports.updateProfile = updateProfile;
const sendEmailChangePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const userFound = yield users_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!userFound) {
            res.status(400).json({ message: 'No se ha encontro ningun usuario registrado con el siguiente correo: ' + email });
        }
        const tokenbody = {
            cedula: userFound === null || userFound === void 0 ? void 0 : userFound.cedula
        };
        const acesstoken = jsonwebtoken_1.default.sign(tokenbody, config_1.default.SECRET, {
            expiresIn: '10m'
        });
        const link = 'http://localhost:4200/changePassword/' + acesstoken;
        yield sendLinkResetPassword(email, link);
        res.status(200).json({ message: 'Se ha enviado un un link de recuperación al siguiente correo: ' + email });
    }
    catch (error) {
        //res.status(400).json({message:'!Ups ocurrio un error',error}) 
    }
});
exports.sendEmailChangePassword = sendEmailChangePassword;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, cedula, email, idCareer } = req.body;
        const encryptedPassword = yield users_1.default.encryptPassword(cedula);
        const rol = yield roles_1.default.findOne({ where: { name: 'Docente' } });
        if (rol) {
            const newUser = yield users_1.default.create({
                name,
                lastname,
                cedula,
                email,
                password: encryptedPassword,
                idCareer,
                idRol: rol.idRol
            });
            yield fileFacilitador_1.default.create({
                idUser: newUser.idUser
            });
            yield (0, exports.enviarCredencialesPorCorreo)(email, cedula, cedula, res);
            res.status(201).json({ message: 'Usuario Creado' });
        }
        else {
            res.status(400).json({ message: 'Ocurrio un Error' });
            return;
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createUser = createUser;
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    ignoreTLS: true,
    auth: {
        user: config_1.default.EMAIL,
        pass: config_1.default.EMAIL_PASS,
    }
});
const sendLinkResetPassword = (correo, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: config_1.default.EMAIL,
            to: correo,
            subject: "Recuperar Contraseña",
            html: `
    <b>No compartas con nadie el siguiete link</b>
    <b>link de recuperación: </b>
    <a href="${link}">Recuperar Password</a>
    `
        });
    }
    catch (error) {
    }
});
const enviarCredencialesPorCorreo = (correo, usuario, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: config_1.default.EMAIL,
            to: correo,
            subject: "Credenciales Educación Continua",
            html: `
      <b>Las credenciales para que ingreses a la aplicacion web de planificación de Eventos son:</b>
      <p>Usuario: ${usuario}</p>
      <p>Contraseña: ${password}</p>
      `
        });
    }
    catch (error) {
        res.status(400).json({ message: 'No se pudo enviar el correo' });
        return;
    }
});
exports.enviarCredencialesPorCorreo = enviarCredencialesPorCorreo;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        const { name, lastname, cedula, email, idCareer, estado, idRol } = req.body;
        const user = yield users_1.default.findByPk(idUser);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user) {
            if (user.email != email) {
                yield (0, exports.enviarCredencialesPorCorreo)(email, cedula, cedula, res);
            }
        }
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.idCareer = idCareer;
        user.estado = estado;
        user.idRol = idRol;
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
});
exports.updateUserById = updateUserById;
//-----------------------
