import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcrypt";
interface UserAttributes {
  idUser: string;
  name: string;
  lastname: string;
  cedula: string;
  email: string;
  password: string;
  estado:string;
  fechaNacimiento:Date;
  nacionalidad:string; 
  direccion:string;
  telefono:string;
  educacion:string;
  experienciaProfesional:string;
  cursos:string;
  foto:string;
  idCareer:string
  idRol:string
}

interface UserCreationAttributes extends Optional<UserAttributes, "idUser" | "estado" | "foto" | "nacionalidad" |"fechaNacimiento" | "direccion" | "cursos" | "telefono" | "educacion" | "experienciaProfesional" >  {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  
  [x: string]: any;
  public idUser!: string;
  public name!: string;
  public lastname!: string;
  public cedula!: string;
  public email!: string;
  public password!: string;
  public estado!:string;
  public idCareer!: string;
  public idRol!:string;
  fechaNacimiento!: Date;
  nacionalidad!: string;
  direccion!: string;
  telefono!: string;
  educacion!: string;
  experienciaProfesional!: string;
  cursos!: string;
  foto!: string;

  public static encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static comparePassword(password: string, receivedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, receivedPassword);
  }
}

User.init(
  {
    idUser: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    cedula: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    } 
    ,
    estado:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
    },
    nacionalidad: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    educacion: {
      type: DataTypes.STRING,
    },
    experienciaProfesional: {
      type: DataTypes.STRING,
    },
    cursos: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.TEXT,
    },
    idCareer:{
      type: DataTypes.UUID,
    },
    idRol: {
      type: DataTypes.UUID,
    }

  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
