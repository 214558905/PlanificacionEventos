import { NextFunction, Request, Response } from "express";
import Role from "../models/roles";

export const getAllRols = async (req: Request, res: Response)=>{

    try {
        const careers = await Role.findAll({
            where:{
                name:'Docente'
            }
        });
        res.status(200).json(careers);
    } catch (error) {
        res.status(400).json({ message: '¡Ups! Ocurrió un error' });
    }
}