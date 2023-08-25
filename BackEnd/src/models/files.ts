import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";


interface FileAtributtes{
  fileId: string,
  name: string,
  linkFile:string,
}


class File extends Model<FileAtributtes> implements FileAtributtes{
  fileId!: string;
  name!: string;
  linkFile!:string;

}
File.init(
  { 
  fileId: {
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
    modelName: "FilePorposal"
  }
)

export default File; 