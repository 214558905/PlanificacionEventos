import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";

interface PorposalAtributtes {
  porposalId: string;
  nameEvent: string;
  titleEvent: string;
  provincia: string;
  canton: string;
  sector: string;
  institution: string;
  dateFinEvent: Date;
  linkZoom: string;
  instroduction: string;
  justification: string;
  goals: string;
  generalObjective: string;
  specificObjective: string;
  objectivePublic: string;
  guests: string;
  dateEvent: Date; 
  contentEvent: string;
  duration: string;
  activitiesEvent: string;
  name: string;
  datePresentation: Date;
  state:string; 
  //---
  costo:string;
  dirigidoA:string;
  habilidades:string
  descriptionEvent:string;
  metodologiaE:string;
  evaluacion:string;
  facilitador:string;
  comment:string
  //----------------
  idUser: string;
  fileId: string;
  fileEsquemaId:string;
  careerId: string; 
  facultyId: string;
  eventId: string;
  fileFacilitadorId: string
}
//QUITAR IDS PARA QUE NO HAYA CAMPOS VACIOS
interface PorposalCreationAttributes
  extends Optional<
    PorposalAtributtes,
    "porposalId" | "idUser" | "fileId" | "careerId" | "facultyId" | "eventId" | 'state' | "fileEsquemaId" | "fileFacilitadorId" | "comment"
  > {}

class Porposal
  extends Model<PorposalAtributtes, PorposalCreationAttributes>
  implements PorposalAtributtes
{
  nameEvent!: string;
  titleEvent!: string;
  provincia!: string;
  canton!: string;
  sector!: string;
  institution!: string;
  dateFinEvent!: Date;
  linkZoom!: string;
  instroduction!: string;
  justification!: string;
  goals!: string;
  generalObjective!: string;
  specificObjective!: string;
  objectivePublic!: string;
  guests!: string;
  dateEvent!: Date;
  contentEvent!: string;
  duration!: string;
  activitiesEvent!: string;
  datePresentation!: Date;
  idUser!: string;
  fileId!: string;
  fileEsquemaId!: string;
  careerId!: string;
  facultyId!: string;
  eventId!: string;
  partcipantId!: string;
  name!: string;
  position!: string;
  activities!: string;
  porposalId!: string;
  state!: string;
  costo!: string;
  dirigidoA!: string;
  habilidades!: string;
  descriptionEvent!: string;
  metodologiaE!: string;
  evaluacion!: string;
  facilitador!: string;
  fileFacilitadorId!: string;
  comment!:string
}
Porposal.init(
  {
    porposalId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nameEvent: {
      type: DataTypes.STRING,
    },
    titleEvent: {
      type: DataTypes.STRING,
    },
    provincia: {
      type: DataTypes.STRING,
    },
    canton: {
      type: DataTypes.STRING,
    },
    sector: {
      type: DataTypes.STRING,
    },
    institution: {
      type: DataTypes.TEXT,
    },
    dateFinEvent: {
      type: DataTypes.DATE,
    },
    linkZoom: {
      type: DataTypes.STRING,
    },
    instroduction: {
      type: DataTypes.TEXT,
    },
    justification: {
      type: DataTypes.TEXT,
    },
    goals: {
      type: DataTypes.TEXT,
    },
    generalObjective: {
      type: DataTypes.STRING,
    },
    specificObjective: {
      type: DataTypes.TEXT, 
    },
    objectivePublic: {
      type: DataTypes.TEXT,
    },
    guests: {
      type: DataTypes.TEXT,
    },
    dateEvent: {
      type: DataTypes.DATE,
    },
    contentEvent: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    activitiesEvent: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.STRING,
    },
    datePresentation: {
      type: DataTypes.DATE,
    },
    idUser: {
      type: DataTypes.UUID,
    },
    fileId: {
      type: DataTypes.STRING,
    },
    fileEsquemaId: {
      type: DataTypes.STRING,
    },
    careerId: {
      type: DataTypes.UUID,
    },
    facultyId: {
      type: DataTypes.UUID,
    },
    fileFacilitadorId: {
      type: DataTypes.UUID,
    },
    comment:{
      type:DataTypes.TEXT
    },
    eventId: {
      type: DataTypes.UUID,
    },
    state:{
      type: DataTypes.ENUM('En Revisión','Aprobado','Rechazado','Corregido'),
    },
    costo: {
      type: DataTypes.STRING,
    },
    dirigidoA: {
      type: DataTypes.STRING,
    },
    habilidades: {
      type: DataTypes.STRING,
    },
    descriptionEvent: {
      type: DataTypes.STRING,
    },
    metodologiaE: {
      type: DataTypes.STRING,
    },
    evaluacion: {
      type: DataTypes.STRING,
    },
    facilitador: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Porposal",
  }
);

export default Porposal;
