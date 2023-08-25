import { Op } from "sequelize";
import sequelize from "../database";
import Event from "../models/events";
import { Request, Response } from "express";

export const getAllEvents = async (req: Request, res: Response)=>{
    try {
        const events = await Event.findAll({
            order: [['updatedAt', 'DESC']],
        })
        res.status(200).json(events)
    } catch (error) {
        res.status(400).json({ message: '¡Ups! Ocurrió un error' });
    }
}

export const createEvent = async (req:Request, res:Response)=>{
    try {   
        const {name} = req.body
        const sameEvent = await Event.findOne({
            where:{
                name,
            }
        })
        if(sameEvent){
            res.status(400).json({message:'No pueden existir dos eventos con el mismo nombre'}) 
            return    
        }
        await Event.create({
            name
        })
        res.status(200).json({message:'Evento creado'})
    } catch (error) {
        res.status(400).json({message:'!error',error})
    }
}

export const editEventById = async (req:Request, res:Response)=>{
    try {   
        const {eventId} = req.params
        const {name}=req.body
        const sameEvent = await Event.findOne({
            where:{
                name,
                eventId: { [Op.not]: eventId }
            }
        })
        if(sameEvent){
            res.status(400).json({message:'No pueden existir dos eventos con el mismo nombre'})  
            return
        }
        const event = await Event.findByPk(eventId)

        if(!event){
            res.status(400).json({message:'Facultad no encontrada'})
        }
        await event?.update({
            name
        })
       
        res.status(200).json({message:'Evento editado'})
    } catch (error) {
        res.status(400).json({message:'!error',error})
    }
}
