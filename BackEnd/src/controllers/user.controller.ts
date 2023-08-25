import { NextFunction, Request, Response } from "express";
import User from '../models/users'
import Role from "../models/roles";
import Career from "../models/careers";
import  nodemailer from 'nodemailer';
import { Op } from "sequelize";
import FileFacilitador from "../models/fileFacilitador";
import jwt from 'jsonwebtoken';
import config from "../config";
  

export const getAllUsers = async (req: Request, res:Response)=>{

    try {
        const users = await User.findAll({
          order: [['updatedAt', 'DESC']],
          where: {
            cedula: {
              [Op.ne]: '0106518491' 
            }
          },
          include:[{
            model:Career,
            as: 'career',
            attributes: ['name']
          },{
            model:Role,
            as: 'roles',
            attributes:['name'],
          }]
        });
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }

}
export const getUserById = async (req: Request, res:Response) => {
  try {
    const { idUser } = req.params; 
    const user = await User.findByPk(idUser,);

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(400).json({message:'Usuario no encontrado'})
    }
  } catch (error) {
    return null; // Retorna null en caso de error
  }
};



export const deleteUserById = async (req: Request, res:Response)=>{
  const { idUser } = req.params;
  
  await User.destroy({ where: { idUser: idUser } })
  .then((rowsDeleted: number) => {
    if (rowsDeleted > 0) {
      res.status(200).json({message: "Registro eliminado correctamente"})
    } else {
      res.status(400).json({message: "Usuario no encontrado"})
    }
  })
  .catch((error: any) => {
    console.error('Error al eliminar el registro:', error);
  });

}
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params;
    const {
      fechaNacimiento,
      nacionalidad,
      direccion,
      telefono,
      educacion,
      experienciaProfesional,
      foto,
      name,
      lastname, 
      cedula,
    } = req.body;

    const userFound = await User.findByPk(idUser);

    if (!userFound) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    await userFound.update({
      fechaNacimiento,
      nacionalidad,
      direccion,
      telefono,
      educacion,
      experienciaProfesional,
      foto,
      name,
      lastname, 
      cedula,
    });

    return res.status(200).json({ message: 'Perfil Actualizado' });
  } catch (error) {
    return res.status(500).json({ message: '¡Ups no se pudo actualizar', error });
  }
};
export const sendEmailChangePassword=async(req:Request, res:Response)=>{
  const {email}=req.body
  try {
      const userFound = await User.findOne({
        where:{
          email:email
        }
      })
      if(!userFound){
        res.status(400).json({message:'No se ha encontro ningun usuario registrado con el siguiente correo: '+ email})
      }
      const tokenbody={
        cedula:userFound?.cedula
      }
      const acesstoken = jwt.sign(tokenbody,config.SECRET,{  
        expiresIn:'10m'
      })
      const link = 'http://localhost:4200/changePassword/'+acesstoken
      await sendLinkResetPassword(email,link)
      res.status(200).json({message:'Se ha enviado un un link de recuperación al siguiente correo: '+email})
  } catch (error) { 
    //res.status(400).json({message:'!Ups ocurrio un error',error}) 
  } 
}   
export const createUser = async (req: Request, res: Response) =>{
    
  try {
    
      const {name, lastname, cedula, email, idCareer} = req.body;
      const encryptedPassword = await User.encryptPassword(cedula);
      const rol = await Role.findOne({where:{name:'Docente'}})
      if(rol){
        const newUser = await User.create({ 
          name,
          lastname, 
          cedula,
          email,
          password: encryptedPassword,
          idCareer, 
          idRol:rol.idRol
      }); 
      await FileFacilitador.create({ 
        idUser: newUser.idUser  
      })
      await enviarCredencialesPorCorreo(email,cedula,cedula,res)
      res.status(201).json({message:'Usuario Creado'}); 
      }else{ 
        res.status(400).json({ message: 'Ocurrio un Error' });
        return
      }
       
  } catch (error:any) {
      res.status(400).json({ message: error.message }); 
  } 

}
 

const transporter = nodemailer.createTransport ({
  service: 'gmail', 
  port: 25,
  secure: false,
  ignoreTLS:true,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS,
  }
  });
const sendLinkResetPassword = async(correo:string, link:string)=>{ 
  try {
    await transporter.sendMail({
    from: config.EMAIL,
    to: correo,
    subject: "Recuperar Contraseña",
    html:`
    <b>No compartas con nadie el siguiete link</b>
    <b>link de recuperación: </b>
    <a href="${link}">Recuperar Password</a>
    `
  });
} catch (error) {
 
}
}
export const enviarCredencialesPorCorreo= async(correo:string, usuario:string,password:string, res:Response) => {
  
  try {
      await transporter.sendMail({
      from: config.EMAIL,
      to: correo,
      subject: "Credenciales Educación Continua",
      html:`
      <b>Las credenciales para que ingreses a la aplicacion web de planificación de Eventos son:</b>
      <p>Usuario: ${usuario}</p>
      <p>Contraseña: ${password}</p>
      `
    });
  } catch (error) {
    res.status(400).json({message:'No se pudo enviar el correo'})
    return
  }
}
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params; 
    const { name, lastname, cedula, email, idCareer, estado, idRol} = req.body; 
    const user = await User.findByPk(idUser);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if(user){
      if(user.email!=email){
        await enviarCredencialesPorCorreo(email,cedula,cedula,res)
      }
    }
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.idCareer = idCareer;
    user.estado= estado;
    user.idRol = idRol;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};



//-----------------------
 