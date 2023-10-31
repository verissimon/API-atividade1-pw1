import { Request, Response, NextFunction } from "express";
import { users, prisma} from "../data/database"
import { NotFoundError } from "../helpers/apiErrors";

export const checkTechIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    const tech = await prisma.technology.findUnique({
        where: {
            id: id as string
        }
    })

    if(!tech)
        return res.status(404).json({ message: "Technology id not found" })

    const user = await prisma.user.findUnique({
        where: {
            id: tech?.studentId as string
        }
    })
    if(!user)
        return res.status(404).json({ message: "User not found" })

    next()
}
