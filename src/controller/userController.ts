import { Request, Response } from "express";
import { userServices } from "../services/userServices";

const addUser = async (req: Request, res: Response) => {
    const { name, username } = req.body
    
    const newUser = await userServices.create(name, username)
    return res.status(201).json(newUser)
}

const listUsers = async (req: Request, res: Response) => {
    const allUsers = await userServices.findAll()
    res.status(200).json(allUsers);
}

export const UserController = {
    addUser,    //create
    listUsers,  //read
}