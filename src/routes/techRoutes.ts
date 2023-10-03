import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";
import { checkTechIdExists } from "../middlewares/checkTechIdExists";
import { techController } from "../controller/techController";

const router = Router()

router.get('/', checkExistsUserAccount, techController.listUserTechs)
router.post('/', checkExistsUserAccount, techController.createUserTech)
router.put("/:id", checkExistsUserAccount, checkTechIdExists, techController.updateTitleDeadline)
router.patch("/:id/studied", checkExistsUserAccount, checkTechIdExists, techController.updateStudied)
router.delete("/:id", checkExistsUserAccount, checkTechIdExists, techController.deleteTech)

export default router