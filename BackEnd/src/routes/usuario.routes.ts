import { Router } from "express";
import { createUser,getUserById,sendEmailChangePassword,updateProfile,updateUserById } from "../controllers/user.controller";
import { checkExistingUser, checkExistinigUserbyId } from "../middlewares/validator";
import { changePassword, signIn } from "../controllers/auth.controllers";
import { deleteUserById, getAllUsers} from "../controllers/user.controller";
import { decodeToken, verifyToken } from "../middlewares/autorization";

const router = Router(); 

router.post('/signup',checkExistingUser,createUser)
router.post('/signin',signIn)
router.get('/getallUsers',verifyToken, getAllUsers )
router.delete('/:idUser',deleteUserById)
router.post('/editUser/:idUser',    checkExistinigUserbyId, updateUserById)
router.get('/getOneUser/:idUser',getUserById)
router.get('/decode', decodeToken)
router.put('/updateProfile/:idUser', updateProfile)
router.put('/resetPassword', changePassword)
router.post('/sendlinkRecuperationPassword', sendEmailChangePassword)



export default router;  