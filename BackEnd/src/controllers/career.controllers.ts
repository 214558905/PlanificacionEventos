
import { NextFunction, Request, Response } from "express";
import Career from "../models/careers";
import { Op } from "sequelize";

export const getAllCareeers = async (req: Request, res: Response)=>{

    try {
        const careers = await Career.findAll({
            order: [['updatedAt', 'DESC']],
        });
        res.status(200).json(careers);
    } catch (error) {
        res.status(400).json({ message: '¡Ups! Ocurrió un error' });
    }
}

export const createCareer = async (req:Request, res:Response)=>{
    try {   
        const {name} = req.body
        const sameCarer = await Career.findOne({
            where:{
                name,
            }
        })
        if(sameCarer){
            res.status(400).json({message:'No pueden existir dos carreras con el mismo nombre'}) 
            return    
        }
        await Career.create({
            name
        })
        res.status(200).json({message:'Carrera creado'})
    } catch (error) {
      
    }
}

export const editCareerById = async (req:Request, res:Response)=>{
    try {   
        const {careerId} = req.params
        const {name}=req.body
        const sameCarer = await Career.findOne({
            where:{
                name,
                careerId: { [Op.not]: careerId }
            }
        })
        if(sameCarer){
            res.status(400).json({message:'No pueden existir dos carreras con el mismo nombre'})  
            return
        }
        const career = await Career.findByPk(careerId)

        if(!career){
            res.status(400).json({message:'Facultad no encontrada'})
        }
        await career?.update({
            name
        })
       
        res.status(200).json({message:'Carrera editada'})
    } catch (error) {
    }
}
