import { Request, Response } from "express";
import Porposal from "../models/proposalEvent";
import Participants from "../models/participantsE";
import fs from 'fs';
import  {google} from 'googleapis';
import File from '../models/files';
import Event from "../models/events";
import Horario from "../models/horario";
import FileEsquema from "../models/fileEsquema";
import FileFacilitador from "../models/fileFacilitador";
import { Op } from "sequelize";
import Career from "../models/careers";

export const updatefileId = async (req:Request, res:Response)=>{
  try {
    const { porposalId } = req.params;
    const {fileId, fileEsquemaId } = req.body
    const porposal = await Porposal.findByPk(porposalId);
    if(porposal && fileId ){
      await porposal.update({
        fileId
      })
    }else if( porposal && fileEsquemaId){
      await porposal.update({
        fileEsquemaId
      })
      
    }
    res.status(200).json({message:'OK'})
  } catch (error) { 
    res.status(400).json({ message: 'Ups no se pudo editar la Propuesta', error});
  }
}
export const deletePorposalById=async(req:Request, res:Response)=>{

  try {
    const {porposalId}= req.params

    const porposal = await Porposal.findByPk(porposalId)

    if(!porposal){
      res.status(400).json({ message: 'No existe la Propuesta'});
    }
    
    await porposal?.destroy()

    res.status(200).json({message:'La propuesta ha sido eliminada'})
  } catch (error) {
    res.status(400).json({ message: '!Error', error});
  }

}
export const createProposal = async (req: Request, res: Response) => {
  try {
    const {
      nameEvent,
      titleEvent,
      provincia,
      canton,
      sector,
      institution,
      dateFinEvent,
      linkZoom,
      instroduction,
      justification,
      goals,
      generalObjective,
      specificObjective,
      objectivePublic,
      guests,
      dateEvent,
      contentEvent,
      duration,
      activitiesEvent,
      name,
      datePresentation,
      idUser,
      careerId,
      facultyId,
      eventId,
      participants, 
      horario,
      costo,
      dirigidoA,
      habilidades,
      descriptionEvent,
      metodologiaE,
      evaluacion,
      facilitador,
      state
    } = req.body;

    const fileFacilitador = await FileFacilitador.findOne(
      {
        where:{idUser:idUser}
      }
    )
    const fileFacilitadorId = fileFacilitador?.fileFacilitadorId
    const proposal = await Porposal.create({
      nameEvent,
      titleEvent,
      provincia,
      canton,
      sector,
      institution,
      dateFinEvent,
      linkZoom,
      instroduction,
      justification,
      goals,
      generalObjective,
      specificObjective,
      objectivePublic,
      guests,
      dateEvent,
      contentEvent,
      duration,
      activitiesEvent,
      name,
      datePresentation,
      idUser,
      careerId,
      facultyId,
      eventId,
      costo,
      dirigidoA,
      habilidades,
      descriptionEvent,
      metodologiaE,
      evaluacion,
      facilitador,
      fileFacilitadorId,
      state
    });
    proposal.save()
    await createHorario(horario,proposal.porposalId)
    await createParticipants(participants,proposal.porposalId)
    res.status(200).json(proposal.porposalId);
  } catch (error) {
    console.error('Error al crear la propuesta:', error);
    res.status(500).json({ error: 'Error al crear la propuesta' });
  }
};

export const getAllPorposalbyId = async (req: Request, res:Response)=>{
  try {
    const { idUser } = req.params; 
    const porposals = await Porposal.findAll({
      order: [['updatedAt', 'DESC']],
      where: { idUser },
      include:[{
        model:File,
      }
      ,
      {
        model:FileEsquema,
      },
      {
        model:Event,
        as:'evento',
        attributes:['name'],
      }
    
    ]
    })
    res.status(200).json(porposals)
  } catch (error) {
    res.status(400).json({message:'Ups! Ocurrio un Error',error})
  }
}

export const getPorposalbyId = async(req:Request, res:Response)=>{

  try {
    const {porposalId} = req.params;
    const porposal = await Porposal.findByPk(porposalId,{
      include:[{
        model:File,
      },
      {
        model:FileEsquema,
      }
      ,
      {
        model:FileFacilitador,
      },
       ]
    })
    res.status(200).json(porposal)
    
  } catch (error) {
    res.status(400).json({message:'Ups Ocurrio un error',error})
  }

}


export const getParticipansPorposal = async(req:Request, res:Response)=>{

  try {
    const {porposalId} = req.params;
    const participants = await Participants.findAll({where:{porposalId:porposalId}})
    res.status(200).json(participants)
    
  } catch (error) {
    res.status(400).json({message:'Ups Ocurrio un error',error})
  }

}
export const getHorarioPorposal = async(req:Request, res:Response)=>{

  try {
    const {porposalId} = req.params;
    const horario = await Horario.findAll({where:{porposalId:porposalId}})
    res.status(200).json(horario)
    
  } catch (error) {
    res.status(400).json({message:'Ups Ocurrio un error',error})
  }

}
export const getAllPorposals = async (req:Request, res:Response)=>{
  try {
    const porposals = await Porposal.findAll({
      order: [['updatedAt', 'DESC']],
      include:[{
        model:File,
      },
      {
        model:FileEsquema,
      }
      ,
      {
        model:FileFacilitador,
      },
      {
        model:Event,
        as:'evento',
        attributes:['name'],
      } 
       ]
    })
    res.status(200).json(porposals)
  } catch (error) {
    res.status(400).json({message:'Ups Ocurrio un error',error})
  }
}
export const editPorposal = async (req:Request, res:Response) =>{
  try {
    const {porposalId} = req.params
    const {
      nameEvent,
      titleEvent,
      provincia,
      canton,
      sector,
      institution,
      dateFinEvent,
      linkZoom,
      instroduction,
      justification,
      goals,
      generalObjective,
      specificObjective,
      objectivePublic,
      guests,
      dateEvent,
      contentEvent,
      duration,
      activitiesEvent,
      name,
      datePresentation,
      idUser,
      careerId,
      facultyId,
      eventId,
      participants, 
      horario,
      costo,
      dirigidoA,
      habilidades,
      descriptionEvent,
      metodologiaE,
      evaluacion,
      facilitador,
      state
    } = req.body;
    await Horario.destroy({
      where:{
        porposalId:porposalId
      }
    })
    await Participants.destroy({
      where:{
        porposalId:porposalId
      }
    })
    const porposal = await Porposal.findByPk(porposalId);
    console.log(porposal)
    if(porposal){
      await porposal.update({
      nameEvent,
      titleEvent,
      provincia,
      canton,
      sector,
      institution,
      dateFinEvent,
      linkZoom,
      instroduction,
      justification,
      goals,
      generalObjective,
      specificObjective,
      objectivePublic,
      guests,
      dateEvent,
      contentEvent,
      duration,
      activitiesEvent,
      name,
      datePresentation,
      idUser,
      careerId,
      facultyId,
      eventId,
      costo,
      dirigidoA,
      habilidades,
      descriptionEvent,
      metodologiaE,
      evaluacion,
      facilitador,
      state
      })
    await createHorario(horario,porposalId)
    await createParticipants(participants,porposalId)
    res.status(200).json({ message: 'Propuesta editada correctamente correctamente'});
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Ups no se pudo editar la Propuesta', error});
  }
}
const createParticipants= async(participants:any, idPorposal:any)=>{
  for(const participant of participants){
    await Participants.create({
      name:participant.name,
      activities:participant.activities,
      porposalId: idPorposal,
      position: participant.position
    })

  }
}
export const generarCronograma= async (req:Request, res:Response)=>{
  try {
    const {fechaInicio,fechaFin}=req.body
    console.log(req.body)
    const porposals = await Porposal.findAll({
      order:[['dateEvent','ASC']],
      where:{
        datePresentation:{
          [Op.between]:[fechaInicio, fechaFin]
        },
        state:'Aprobado'
      },
      include:[
        {
          model:Career,
          as:'careerP',
          attributes:['name'],
        },
        {
          model:Event,
          as:'evento',
          attributes:['name'],
        }
      ]
    })
    res.status(200).json(porposals)
  } catch (error) {
    res.status(400).json({ message: '!Ups ocurrio un error', error});
  }
}
export const addComment = async (req:Request,res:Response)=>{
  try {
    const {porposalId}=req.params
    const {state,comment}=req.body;
    const porposalFound = await Porposal.findByPk(porposalId)
    if(!porposalFound){
      res.status(400).json({message:'Propuesta no encontrada'})
    }else{
      await porposalFound.update({
        state,
        comment
      })
      res.status(200).json({message:'Propuesta editada'})
    }
    
  } catch (error) {
    
  }
}
const createHorario= async(horarios:any, idPorposal:any)=>{
  if(horarios){
    for(const horario of horarios){
      await Horario.create({
        porposalId: idPorposal,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
      })
  
    }
  }
  
}

