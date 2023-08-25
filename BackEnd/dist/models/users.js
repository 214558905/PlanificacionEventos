"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    static encryptPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    static comparePassword(password, receivedPassword) {
        return bcrypt_1.default.compare(password, receivedPassword);
    }
}
User.init({
    idUser: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    nacionalidad: {
        type: sequelize_1.DataTypes.STRING,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    educacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    experienciaProfesional: {
        type: sequelize_1.DataTypes.STRING,
    },
    cursos: {
        type: sequelize_1.DataTypes.STRING,
    },
    foto: {
        type: sequelize_1.DataTypes.TEXT,
    },
    idCareer: {
        type: sequelize_1.DataTypes.UUID,
    },
    idRol: {
        type: sequelize_1.DataTypes.UUID,
    }
}, {
    sequelize: database_1.default,
    modelName: "User",
});
exports.default = User;
