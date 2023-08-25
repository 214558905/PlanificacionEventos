import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface HorarioAttributes {
  horarioId: string;
  porposalId: string;
  diaSemana: string;
  horaInicio: Date;
  horaFin: Date;
}

interface HorarioCreationAttributes extends Optional<HorarioAttributes, "horarioId"> {}

class Horario extends Model<HorarioAttributes, HorarioCreationAttributes>
  implements HorarioAttributes {
  public horarioId!: string;
  public porposalId!: string;
  public diaSemana!: string;
  public horaInicio!: Date;
  public horaFin!: Date;
}

Horario.init(
  {
    horarioId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    porposalId: {
      type: DataTypes.UUID,
    },
    diaSemana: {
      type: DataTypes.STRING,
    },
    horaInicio: {
      type: DataTypes.DATE,
    },
    horaFin: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Horario",
    timestamps: false,
  }
);

export default Horario;
