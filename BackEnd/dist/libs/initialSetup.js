"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const careers_1 = __importDefault(require("../models/careers"));
const roles_1 = __importDefault(require("../models/roles"));
const events_1 = __importDefault(require("../models/events"));
require("../models/asosations");
const faculty_1 = __importDefault(require("../models/faculty"));
const users = [
    { name: 'Alex', lastname: 'Naula', cedula: '0106518491', email: 'alex@gmail.com', password: '0106518491' }
];
const carreras = [
    { name: 'Software' },
    { name: 'Producción' },
    { name: 'Derecho' },
    { name: 'Enfermería' },
    { name: 'Nutrición' },
];
const roles = [
    { name: "Administrador" },
    { name: "Docente" },
];
const events = [
    { name: 'Curso' },
    { name: 'Taller' },
    { name: 'Seminario' },
    { name: 'Congreso' },
    { name: 'Webinar' },
    { name: 'Conferencia' },
    { name: 'Diplomado' }
];
const faculties = [
    { name: 'Ingeniería' },
    { name: 'Medicina' },
    { name: 'Derecho' },
];
database_1.default.sync({ force: false }).then(() => {
    console.log('Coneccion Establecida');
}).then(() => {
    faculties.forEach(faculty => faculty_1.default.create(faculty));
    //events.forEach(event=>Event.create(event))
    //roles.forEach(role=>Role.create(role))
}).then(() => {
    carreras.forEach(career => careers_1.default.create(career));
}).then(() => {
    events.forEach(event => events_1.default.create(event));
}).then(() => {
    roles.forEach(role => roles_1.default.create(role));
});
/* .then(()=>{
}).then(async ()=>{
   let user1 = await User.create({ name:'Pedro', lastname: 'Naula', cedula:'0106518491', email:'aaex@gmail.com',password:'0106518491'})
  let user2 = await User.create({ name:'Camilo', lastname: 'Naula', cedula:'0106518491', email:'alwex@gmail.com',password:'0106518491'})
  let role = await Role.create({ name: "Administrador" })
  role.addUser([user1, user2])
}) */
/* Role.sync()
  .then(() => {
    return Role.findAll();
  })
  .then((roles: Role[]) => {
    if (roles.length === 0) {
      const initialRoles = [
        { name: "Coordinador" },
        { name: "Director" },
        { name: "Facilitador" },
      ];

      return Role.bulkCreate(initialRoles) as Promise<Role[]>;
    } else {
      console.log('Roles already exist in the database.');
      return Promise.resolve([]);
    }
  })
  .then(() => {
    console.log('Roles inserted successfully.');
  })
  .catch((error: any) => {
    console.error('Error inserting or querying roles:', error);
  });
   */ 
