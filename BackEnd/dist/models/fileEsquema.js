"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
class FileEsquema extends sequelize_1.Model {
}
FileEsquema.init({
    fileEsquemaId: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    linkFile: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.default,
    modelName: "FileEsquema"
});
exports.default = FileEsquema;
