"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const careers_1 = __importDefault(require("./careers"));
const faculty_1 = __importDefault(require("./faculty"));
const proposalEvent_1 = __importDefault(require("./proposalEvent"));
const roles_1 = __importDefault(require("./roles"));
const users_1 = __importDefault(require("./users"));
const events_1 = __importDefault(require("./events"));
const files_1 = __importDefault(require("./files"));
const participantsE_1 = __importDefault(require("./participantsE"));
const fileEsquema_1 = __importDefault(require("./fileEsquema"));
const horario_1 = __importDefault(require("./horario"));
const fileFacilitador_1 = __importDefault(require("./fileFacilitador"));
//Relacion 1 a n de la tabla carrera y usuarios 
careers_1.default.hasMany(users_1.default, { as: "career", foreignKey: "idCareer" });
users_1.default.belongsTo(careers_1.default, { as: "career", foreignKey: "idCareer" });
//Relacion 1 a n de la tabla facultad y propuesta  
faculty_1.default.hasMany(proposalEvent_1.default, { as: "faculty", foreignKey: "facultyId" });
proposalEvent_1.default.belongsTo(faculty_1.default, { as: "faculty", foreignKey: "facultyId" });
//Relacion 1 a n de la tabla carrera y propuesta 
careers_1.default.hasMany(proposalEvent_1.default, { as: "careerP", foreignKey: "careerId" });
proposalEvent_1.default.belongsTo(careers_1.default, { as: "careerP", foreignKey: "careerId" });
//Relacion 1 a n de la tabla evento y propuesta
events_1.default.hasMany(proposalEvent_1.default, { as: "evento", foreignKey: "eventId" });
proposalEvent_1.default.belongsTo(events_1.default, { as: "evento", foreignKey: "eventId" });
//Relacion 1 a n de la tabla usuario y propuesta  
users_1.default.hasMany(proposalEvent_1.default, { as: "usuarioP", foreignKey: "idUser" });
proposalEvent_1.default.belongsTo(users_1.default, { as: "usuarioP", foreignKey: "idUser" });
//Relacion 1 a 1 de la tabla propuesta y archivos 
files_1.default.hasOne(proposalEvent_1.default, { foreignKey: "fileId" });
proposalEvent_1.default.belongsTo(files_1.default, { foreignKey: "fileId" });
//Relacion 1 a 1 de la tabla propuesta y archivo Esquema 
fileEsquema_1.default.hasOne(proposalEvent_1.default, { foreignKey: "fileEsquemaId" });
proposalEvent_1.default.belongsTo(fileEsquema_1.default, { foreignKey: "fileEsquemaId" });
//Relacion 1 a 1 de la tabla usuario y archivo Facilitador
users_1.default.hasOne(fileFacilitador_1.default, { foreignKey: "idUser" });
fileFacilitador_1.default.belongsTo(users_1.default, { foreignKey: "idUser" });
//Relacion 1 a 1 de la tabla propuesta y archivo Esquema 
fileFacilitador_1.default.hasOne(proposalEvent_1.default, { foreignKey: "fileFacilitadorId" });
proposalEvent_1.default.belongsTo(fileFacilitador_1.default, { foreignKey: "fileFacilitadorId" });
//Relacion n a 1 de la tabla participantes y propuesta 
proposalEvent_1.default.hasMany(participantsE_1.default, { as: "participante", foreignKey: "porposalId" });
participantsE_1.default.belongsTo(proposalEvent_1.default, { as: "participante", foreignKey: "porposalId" });
//Relacion n a 1 de la tabla horario y propuesta 
proposalEvent_1.default.hasMany(horario_1.default, { as: "horario", foreignKey: "porposalId" });
horario_1.default.belongsTo(proposalEvent_1.default, { as: "horario", foreignKey: "porposalId" });
//Relacion 1 a n de la tabla de usuarios y roles 
roles_1.default.hasMany(users_1.default, { as: "roles", foreignKey: "idRol" });
users_1.default.belongsTo(roles_1.default, { as: "roles", foreignKey: "idRol" });
/* User.belongsToMany(Role, { through: UserRol, foreignKey:"userId"});
Role.belongsToMany(User, { through: UserRol, foreignKey:"rolId"});
   */
