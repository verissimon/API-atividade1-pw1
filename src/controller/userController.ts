import { UserBody } from "../data/typeDefinitions";
import users from "../data/database";
import { Request, Response } from "express";
import { v4 as uuid } from 'uuid'

const addUser = (req: Request, res: Response) => {
    const { name, username } = req.body as UserBody
    
    const newUser: UserBody = {
        id: uuid(),
        name,
        username,
        technologies: []
    }
    users.push(newUser)
    return res.status(201).json(newUser)
}

const listUsers = (req: Request, res: Response) => {
    res.status(200).json(users);
}

export const UserController = {
    addUser,    //create
    listUsers,  //read
}