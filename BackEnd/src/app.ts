import express from "express";
///rutas
import routesUser from "./routes/usuario.routes";
import routerCarer from "./routes/career.routes";
import roterRol from "./routes/role.routes"; 
import routerFile from "./routes/file.routes"
import routerEvent from "./routes/event.routes"
import routerFaculty from "./routes/faculty.routes"
import routerProposal from "./routes/porposal.routes"
//--------------
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelize from "./database";

class Server {
  
  private app: express.Application;
  private port: string;
  constructor() {
    
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.listen();

    //this.dbConnect();
    this.middlewares();
    this.routes();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplication runnig on port " + this.port);
      // Conectase a la base de datos
      // Force true: DROP TABLES
      console.log("hola")
      sequelize
        .sync({ force: false }) 
        .then(() => {
          console.log("Nos hemos conectado a la base de datos");
        })
        .catch((error) => {
          console.log("Se ha producido un error", error);
        });
    });
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }
  /* async dbConnect() {
    try {
      await User.sync({ force: true, match: /_test$/ });
      await Role.sync({ force: true, match: /_test$/ });
      await Career.sync({ force: true, match: /_test$/ });
    } catch (error) {}
  } */
  routes() {
    this.app.use("/api/users", routesUser);
    this.app.use("/api/careers", routerCarer) 
    this.app.use("/api/rols", roterRol) 
    this.app.use("/api/files", routerFile)
    this.app.use("/api/events", routerEvent)
    this.app.use("/api/faculties",routerFaculty)
    this.app.use("/api/proposal", routerProposal)
  }
}

export default Server;
