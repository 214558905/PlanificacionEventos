"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
class FileFacilitador extends sequelize_1.Model {
}
FileFacilitador.init({
    fileFacilitadorId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.UUID,
    },
    fileid: {
        type: sequelize_1.DataTypes.STRING,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    linkFile: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.default,
    modelName: "FileFacilitador"
});
exports.default = FileFacilitador;
