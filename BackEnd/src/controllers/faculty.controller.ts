import { Request, Response } from "express";
import Faculty from "../models/faculty";
import { Op } from "sequelize";

export const getAllFaculties = async (req:Request, res:Response)=>{
    try {
     const faculties = await Faculty.findAll({
        order: [['updatedAt', 'DESC']],
     })
     res.status(200).json(faculties)  
    } catch (error) {
        res.status(400).json({message:'Ups Ocurrio un Error'})
    }
}

export const createFaculties = async (req:Request, res:Response)=>{
    try {   
        const {name} = req.body
        const sameCarer = await Faculty.findOne({
            where:{
                name,
            }
        })
        if(sameCarer){
            res.status(400).json({message:'No pueden existir dos Facultades con el mismo nombre'}) 
            return    
        }
        await Faculty.create({
            name
        })
        res.status(200).json({message:'Facultad creada'})
    } catch (error) {
        res.status(400).json({message:'!error',error})
    }
}

export const editFacultyById = async (req:Request, res:Response)=>{
    try {   
        const {facultyId} = req.params
        const {name}=req.body
        const sameCarer = await Faculty.findOne({
            where:{
                name,
                facultyId: { [Op.not]: facultyId }
            }
        })
        if(sameCarer){
            res.status(400).json({message:'No pueden existir dos Facultades con el mismo nombre'})  
            return
        }
        const faculty = await Faculty.findByPk(facultyId)

        if(!faculty){
            res.status(400).json({message:'Facultad no encontrada'})
        }
        await faculty?.update({
            name
        })
       
        res.status(200).json({message:'Facultad editaad'})
    } catch (error) {
        res.status(400).json({message:'!error',error})
    }
}