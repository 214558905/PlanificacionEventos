"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
class Porposal extends sequelize_1.Model {
}
Porposal.init({
    porposalId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    nameEvent: {
        type: sequelize_1.DataTypes.STRING,
    },
    titleEvent: {
        type: sequelize_1.DataTypes.STRING,
    },
    provincia: {
        type: sequelize_1.DataTypes.STRING,
    },
    canton: {
        type: sequelize_1.DataTypes.STRING,
    },
    sector: {
        type: sequelize_1.DataTypes.STRING,
    },
    institution: {
        type: sequelize_1.DataTypes.TEXT,
    },
    dateFinEvent: {
        type: sequelize_1.DataTypes.DATE,
    },
    linkZoom: {
        type: sequelize_1.DataTypes.STRING,
    },
    instroduction: {
        type: sequelize_1.DataTypes.TEXT,
    },
    justification: {
        type: sequelize_1.DataTypes.TEXT,
    },
    goals: {
        type: sequelize_1.DataTypes.TEXT,
    },
    generalObjective: {
        type: sequelize_1.DataTypes.STRING,
    },
    specificObjective: {
        type: sequelize_1.DataTypes.TEXT,
    },
    objectivePublic: {
        type: sequelize_1.DataTypes.TEXT,
    },
    guests: {
        type: sequelize_1.DataTypes.TEXT,
    },
    dateEvent: {
        type: sequelize_1.DataTypes.DATE,
    },
    contentEvent: {
        type: sequelize_1.DataTypes.STRING,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
    },
    activitiesEvent: {
        type: sequelize_1.DataTypes.TEXT,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    datePresentation: {
        type: sequelize_1.DataTypes.DATE,
    },
    idUser: {
        type: sequelize_1.DataTypes.UUID,
    },
    fileId: {
        type: sequelize_1.DataTypes.STRING,
    },
    fileEsquemaId: {
        type: sequelize_1.DataTypes.STRING,
    },
    careerId: {
        type: sequelize_1.DataTypes.UUID,
    },
    facultyId: {
        type: sequelize_1.DataTypes.UUID,
    },
    fileFacilitadorId: {
        type: sequelize_1.DataTypes.UUID,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT
    },
    eventId: {
        type: sequelize_1.DataTypes.UUID,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM('En Revisión', 'Aprobado', 'Rechazado', 'Corregido'),
    },
    costo: {
        type: sequelize_1.DataTypes.STRING,
    },
    dirigidoA: {
        type: sequelize_1.DataTypes.STRING,
    },
    habilidades: {
        type: sequelize_1.DataTypes.STRING,
    },
    descriptionEvent: {
        type: sequelize_1.DataTypes.STRING,
    },
    metodologiaE: {
        type: sequelize_1.DataTypes.STRING,
    },
    evaluacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    facilitador: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: "Porposal",
});
exports.default = Porposal;
