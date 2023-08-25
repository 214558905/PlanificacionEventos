import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";


interface ParticipantsAtributtes{
  partcipantId: string,
  name: string,
  position:string,
  activities:string,
  porposalId:string

}
interface ParticipantsCreationAttributes extends Optional <ParticipantsAtributtes, "partcipantId" | "porposalId" >{}

class Participants extends Model<ParticipantsAtributtes, ParticipantsCreationAttributes> implements ParticipantsAtributtes{
    partcipantId!: string;
    name!: string;
    position!:string;
    activities!: string;
    porposalId!: string;

}
Participants.init(
  {
    partcipantId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  position: {
    type: DataTypes.STRING
  },
  activities:{
    type: DataTypes.STRING
  },
  porposalId:{
    type: DataTypes.UUID
  }
},{
    sequelize,
    modelName: "Participants"
  }
)

export default Participants; 