import { Request, Response, NextFunction } from "express"
import { UserBody } from "../data/typeDefinitions"
import {users, prisma} from "../data/database"

export const checkValidNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body as UserBody
    const userExists = await prisma.user.findUnique({
        where: { username }
    })

    if(userExists)
        return res.status(400).json({error: 'Usuário já existe'})

    next()
}