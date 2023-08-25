import sequelize from "../database";
import Career from "../models/careers";
import Role from "../models/roles";
import User from "../models/users";
import Event from "../models/events";
import "../models/asosations";
import Faculty from "../models/faculty";

const users =[
  { name:'Alex', lastname: 'Naula', cedula:'0106518491', email:'alex@gmail.com',password:'0106518491'}
]
const carreras =[
  { name: 'Software'},
  { name: 'Producción'},
  { name: 'Derecho'},
  { name: 'Enfermería'},
  { name: 'Nutrición'},
]
const roles=[
  { name: "Administrador" },
  { name: "Docente" },
]
const events=[
  { name: 'Curso'},
  { name: 'Taller'},
  { name: 'Seminario'},
  { name: 'Congreso'},
  { name: 'Webinar'},
  { name: 'Conferencia'},
  { name: 'Diplomado'}
]
const faculties =[
  { name: 'Ingeniería'},
  { name: 'Medicina'},
  { name: 'Derecho'},
]

sequelize.sync({force:false}).then(()=>{
  console.log('Coneccion Establecida')
}).then(()=>{
  faculties.forEach(faculty => Faculty.create(faculty))
  //events.forEach(event=>Event.create(event))
//roles.forEach(role=>Role.create(role))
}).then(()=>{
  carreras.forEach(career=>Career.create(career))
}) .then(()=>{
  events.forEach(event=>Event.create(event))
}).then(()=>{
  roles.forEach(role=>Role.create(role))
})


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