import { Request, Response, NextFunction } from "express"
import { UserBody } from "../data/typeDefinitions"
import users from "../data/database"

export const checkValidNewUser = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body as UserBody
    const userExists = users.some( user => user.username === username )

    if(userExists)
        return res.status(400).json({error: 'Usuário já existe'})

    next()
}