import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";


interface CareerAttributes{
  careerId: string,
  name: string,

}
interface CareerCreationAttributes extends Optional <CareerAttributes, "careerId">{}

class Career extends Model<CareerAttributes, CareerCreationAttributes> implements CareerAttributes{
  careerId!: string;
  name!: string;

}
Career.init(
  {
    
  careerId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
},{
    sequelize,
    modelName: "Career"
  }
)

export default Career; 