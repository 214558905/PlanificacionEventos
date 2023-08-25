"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
///rutas
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty.routes"));
const porposal_routes_1 = __importDefault(require("./routes/porposal.routes"));
//--------------
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
            console.log("hola");
            database_1.default
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
        this.app.use((0, cors_1.default)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
    }
    /* async dbConnect() {
      try {
        await User.sync({ force: true, match: /_test$/ });
        await Role.sync({ force: true, match: /_test$/ });
        await Career.sync({ force: true, match: /_test$/ });
      } catch (error) {}
    } */
    routes() {
        this.app.use("/api/users", usuario_routes_1.default);
        this.app.use("/api/careers", career_routes_1.default);
        this.app.use("/api/rols", role_routes_1.default);
        this.app.use("/api/files", file_routes_1.default);
        this.app.use("/api/events", event_routes_1.default);
        this.app.use("/api/faculties", faculty_routes_1.default);
        this.app.use("/api/proposal", porposal_routes_1.default);
    }
}
exports.default = Server;
