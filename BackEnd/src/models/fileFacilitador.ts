import sequelize from "../database";
import { DataTypes, Model, Optional} from "sequelize";


interface FileFacilitadorAtributtes{
  fileFacilitadorId:string
  idUser:string;
  fileid: string,
  name: string,
  linkFile:string,
}

interface FileFacilitadorCreationAttributes extends Optional<FileFacilitadorAtributtes, "fileFacilitadorId" | "fileid" | "name" |"linkFile"> {}
class FileFacilitador  extends Model<FileFacilitadorAtributtes,FileFacilitadorCreationAttributes> implements FileFacilitadorAtributtes{
  fileFacilitadorId!:string;
  idUser!:string;
  fileid!: string;
  name!: string;
  linkFile!:string;

}
FileFacilitador.init(
  { 
  fileFacilitadorId:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
  },
  idUser:{
    type: DataTypes.UUID,
  },
  fileid: { 
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING
  },
  linkFile:{
    type: DataTypes.STRING
  }
 
},{
    sequelize,
    modelName: "FileFacilitador"
  }
)

export default FileFacilitador; 