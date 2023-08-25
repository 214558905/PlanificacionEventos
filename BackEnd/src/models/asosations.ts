import Career from "./careers";
import Faculty from "./faculty";
import Porposal from "./proposalEvent";
import Role from "./roles";
import User from "./users";
import Event from "./events";
import File from "./files";
import Participants from "./participantsE";
import FileEsquema from "./fileEsquema";
import Horario from "./horario";
import FileFacilitador from "./fileFacilitador";

//Relacion 1 a n de la tabla carrera y usuarios 
Career.hasMany(User, {as: "career", foreignKey: "idCareer"})
User.belongsTo(Career, {as: "career", foreignKey: "idCareer"}); 

//Relacion 1 a n de la tabla facultad y propuesta  
Faculty.hasMany(Porposal, {as: "faculty", foreignKey: "facultyId"})
Porposal.belongsTo(Faculty, {as: "faculty", foreignKey: "facultyId"});

//Relacion 1 a n de la tabla carrera y propuesta 
Career.hasMany(Porposal, {as: "careerP", foreignKey: "careerId"})
Porposal.belongsTo(Career, {as: "careerP", foreignKey: "careerId"});

//Relacion 1 a n de la tabla evento y propuesta
Event.hasMany(Porposal, {as: "evento", foreignKey: "eventId"})
Porposal.belongsTo(Event, {as: "evento", foreignKey: "eventId"});

//Relacion 1 a n de la tabla usuario y propuesta  
User.hasMany(Porposal, {as: "usuarioP", foreignKey: "idUser"})
Porposal.belongsTo(User, {as: "usuarioP", foreignKey: "idUser"});

//Relacion 1 a 1 de la tabla propuesta y archivos 
File.hasOne(Porposal, { foreignKey: "fileId" });
Porposal.belongsTo(File, { foreignKey: "fileId" });

//Relacion 1 a 1 de la tabla propuesta y archivo Esquema 
FileEsquema.hasOne(Porposal, { foreignKey: "fileEsquemaId" });
Porposal.belongsTo(FileEsquema, { foreignKey: "fileEsquemaId" });

//Relacion 1 a 1 de la tabla usuario y archivo Facilitador
User.hasOne(FileFacilitador, { foreignKey: "idUser" });
FileFacilitador.belongsTo(User, { foreignKey: "idUser" });

//Relacion 1 a 1 de la tabla propuesta y archivo Esquema 
FileFacilitador.hasOne(Porposal, { foreignKey: "fileFacilitadorId" });
Porposal.belongsTo(FileFacilitador, { foreignKey: "fileFacilitadorId" });
//Relacion n a 1 de la tabla participantes y propuesta 
Porposal.hasMany(Participants, {as: "participante", foreignKey: "porposalId"})
Participants.belongsTo(Porposal, {as: "participante", foreignKey: "porposalId"});

//Relacion n a 1 de la tabla horario y propuesta 
Porposal.hasMany(Horario, {as: "horario", foreignKey: "porposalId"})
Horario.belongsTo(Porposal, {as: "horario", foreignKey: "porposalId"});

//Relacion 1 a n de la tabla de usuarios y roles 
Role.hasMany(User, {as: "roles", foreignKey: "idRol"})
User.belongsTo(Role, {as: "roles", foreignKey: "idRol"}); 



/* User.belongsToMany(Role, { through: UserRol, foreignKey:"userId"});
Role.belongsToMany(User, { through: UserRol, foreignKey:"rolId"}); 
   */ 



