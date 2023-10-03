import { Router } from "express";
import { checkValidNewUser } from "../middlewares/checkValidNewUser";
import  { UserController }  from "../controller/userController";

const router = Router()

router.post('/', checkValidNewUser, UserController.addUser)
router.get('/', UserController.listUsers)

export default router