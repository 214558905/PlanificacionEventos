import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";


interface FacultyAtributtes{
  facultyId: string,
  name: string,

}
interface FacultyCreationAttributes extends Optional <FacultyAtributtes, "facultyId">{}

class Faculty extends Model<FacultyAtributtes, FacultyCreationAttributes> implements FacultyAtributtes{
  facultyId!: string;
  name!: string;

}
Faculty.init(
  {
    
  facultyId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
},{
    sequelize,
    modelName: "Faculty"
  }
)

export default Faculty; 