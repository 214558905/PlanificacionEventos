import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface RoleAttributes {
  idRol: string;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "idRol"> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public idRol!: string;
  public name!: string;
}

Role.init(
  {
    idRol: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Role",
  }
);


export default Role;
