import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";


interface EventsAtributtes{
  eventId: string,
  name: string,

}
interface EventCreationAttributes extends Optional <EventsAtributtes, "eventId">{}

class Event extends Model<EventsAtributtes, EventCreationAttributes> implements EventsAtributtes{
  eventId!: string;
  name!: string;

}
Event.init(
  {
    
  eventId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  },
},{
    sequelize,
    modelName: "Event"
  }
)

export default Event; 