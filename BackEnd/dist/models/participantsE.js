"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
class Participants extends sequelize_1.Model {
}
Participants.init({
    partcipantId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    position: {
        type: sequelize_1.DataTypes.STRING
    },
    activities: {
        type: sequelize_1.DataTypes.STRING
    },
    porposalId: {
        type: sequelize_1.DataTypes.UUID
    }
}, {
    sequelize: database_1.default,
    modelName: "Participants"
});
exports.default = Participants;
