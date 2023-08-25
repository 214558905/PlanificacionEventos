import sequelize from "../database";
import { DataTypes, Model} from "sequelize";


interface FileEsAtributtes{
  fileEsquemaId: string,
  name: string,
  linkFile:string,
}


class FileEsquema  extends Model<FileEsAtributtes> implements FileEsAtributtes{
  fileEsquemaId!: string;
  name!: string;
  linkFile!:string;

}
FileEsquema.init(
  { 
  fileEsquemaId: { 
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
  linkFile:{
    type: DataTypes.STRING
  }
 
},{
    sequelize,
    modelName: "FileEsquema"
  }
)

export default FileEsquema; 