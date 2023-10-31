import { Request, Response, NextFunction } from "express";
import { users, prisma} from "../data/database"
import { NotFoundError } from "../helpers/apiErrors";

export const checkTechIdExists = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username } = req.headers
    const { id } = req.params
    const user = users.find( ubody => ubody.username === username)
    const techExists = user?.technologies.find(
        tech => tech.id === id)
    if(!techExists)
        throw new NotFoundError("technology does not exist for this user")
    next()
}
