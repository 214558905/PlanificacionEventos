import { Request, Response, NextFunction} from "express";
import User from "../models/users";
import Role from "../models/roles";
import Career from "../models/careers";
import jwt from 'jsonwebtoken';
import config from "../config";
  


export const signIn = async (req: Request, res: Response)=>{

    try {
        const{cedula,password}=req.body
        
        const userFound = await User.findOne({where: { cedula: req.body.cedula }})
        if (!userFound) return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );
        
        if (!matchPassword)
         return res.status(401).json({message: "Usuario o contraseña incorrectos" });
         let  nombre = await getRol(userFound.idRol)
         if(cedula===password){
          const tokenbody={
            cedula:userFound.cedula
          }
          const reset = jwt.sign(tokenbody,config.SECRET,{
            expiresIn:'10m'
          })
          return res.status(200).json({reset})  
        } 
         const token = jwt.sign(tokenBody(userFound, nombre), config.SECRET, {
            expiresIn: '1d',
          });
        if(!userFound.estado){
          return res.status(400).json({ message: "Acceso denegado, contactese con el administrador" })
        }
         res.status(200).json({token})
         res.send("el token ha sido creado correctamente")

    } catch (error) {
         
    }

}

export const changePassword=async(req:Request,res:Response)=>{
  try {
    const resetToken = req.headers.reset as string; 
    const {newPassword} = req.body
  if(!resetToken){
    res.status(400).json({message:"!Ups ocurrio un error"})
  }
  let jwtPayload:any
  jwtPayload= jwt.verify(resetToken, config.SECRET)
  const user = await User.findOne({where:{
    cedula: jwtPayload.cedula
  }})
  if(!user){
    res.status(400).json({message:"Usuario non encontrado"})
  }
  const encryptedPassword = await User.encryptPassword(newPassword);
  await user?.update({
    password:encryptedPassword
  })
  res.status(200).json({message:'Acceso correcto'})
  } catch (error) {
    res.status(400).json({message:"!Ups ocurrio un error",error})
  } 
  
}
const tokenBody = (user:User, name:any) => { 
    return { 
      id: user.idUser,
      name: user.name,
      lastname: user.lastname,
      cedula:user.cedula,
      rol:name
    };
  };
  const getRol = async (id:any)=>{
    const rol = await Role.findOne({where:{idRol:id}})
    let name;
    if(rol){
        name=rol.name
    }
    return name 
} 
