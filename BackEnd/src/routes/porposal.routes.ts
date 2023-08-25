import { Router } from "express";
import { addComment, createProposal, deletePorposalById, editPorposal, generarCronograma, getAllPorposalbyId, getAllPorposals, getHorarioPorposal, getParticipansPorposal, getPorposalbyId, updatefileId } from "../controllers/porposal.controllers";
import { verifyToken } from "../middlewares/autorization";


const router = Router()

router.post('/createProposal', createProposal)
router.get('/getPorposal/:idUser', getAllPorposalbyId)
router.get('/searchPorposal/:porposalId',getPorposalbyId)
router.get('/searchParticipants/:porposalId',getParticipansPorposal)
router.get('/searchHorario/:porposalId',getHorarioPorposal)
router.put('/updatePorposal/:porposalId',editPorposal)
router.put('/updatefileId/:porposalId',updatefileId)
router.get('/getAllPorposals',verifyToken,getAllPorposals)
router.put('/checkPorposa/:porposalId',verifyToken,addComment)
router.post('/getPorposalByYear',generarCronograma)
router.delete('/deletePorposal/:porposalId',deletePorposalById)
export default router; 