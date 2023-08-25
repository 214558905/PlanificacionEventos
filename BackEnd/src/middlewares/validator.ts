import { Op } from 'sequelize';
import User from '../models/users' 
import {Request, Response, NextFunction} from 'express'

export const checkExistingUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFound = await User.findOne({ where: { cedula: req.body.cedula } });
    if (userFound) {
      return res.status(400).json({ message: "Ya hay un usario registrado con esta cedula" });
    }
    const userFound2 = await User.findOne({ where: { email: req.body.email } });
    if (userFound2) {
      return res.status(400).json({ message: "Ya hay un usuario registrado con este email" });
    }

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const checkExistinigUserbyId = async (req: Request, res: Response, next: NextFunction)=>{

  try {
    const {cedula, email } = req.body;
    const idUser = req.params.idUser;
    const user = await User.findOne({ where: { idUser: idUser } });
  
    if (!user) {

      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  
    // Verificar si el nuevo email ya existe en otro usuario
    const existingUser = await User.findOne({ where: { email, idUser: { [Op.ne]: idUser } } });
  
    if (existingUser) {
      // El nuevo email ya está asociado a otro usuario
      return res.status(409).json({ message: 'El email ya está en uso por otro usuario' });
    }
    const existingUserCedula = await User.findOne({ where: { cedula, idUser: { [Op.ne]: idUser } } });
    if (existingUserCedula) {
      //La cedula ya está asociado a otro usuario
      return res.status(409).json({ message: 'La cedula ya está en uso por otro usuario' });
    }
    next()
  } catch (error:any) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: 'Error de clave foránea' });
    }
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
}

