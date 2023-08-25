"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Horario extends sequelize_1.Model {
}
Horario.init({
    horarioId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    porposalId: {
        type: sequelize_1.DataTypes.UUID,
    },
    diaSemana: {
        type: sequelize_1.DataTypes.STRING,
    },
    horaInicio: {
        type: sequelize_1.DataTypes.DATE,
    },
    horaFin: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: database_1.default,
    modelName: "Horario",
    timestamps: false,
});
exports.default = Horario;
