import { Request, Response, NextFunction } from "express";
import { userServices } from "../services/userServices";
import { techServices } from "../services/techServices";

export const checkTechIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    const tech = await techServices.findById(id as string)

    if(!tech)
        return res.status(404).json({ message: "Technology id not found" })

    const user = await userServices.findById(tech?.studentId as string)
    if(!user)
        return res.status(404).json({ message: "User not found" })

    next()
}
