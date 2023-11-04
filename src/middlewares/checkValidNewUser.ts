import { Request, Response, NextFunction } from "express"
import { userServices } from "../services/userServices"

export const checkValidNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body
    const userExists = await userServices.findByUsername(username as string)

    if(userExists)
        return res.status(400).json({error: 'User already exists'})

    next()
}