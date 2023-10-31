import { UserBody } from "../data/typeDefinitions";
import { users, prisma } from "../data/database";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuid } from 'uuid'

const addUser = async (req: Request, res: Response) => {
    const { name, username } = req.body as UserBody
    
    const newUser: Prisma.UserCreateInput = {
        name,
        username,
    }
    await prisma.user.create({
        data: newUser
    })
    return res.status(201).json(newUser)
}

const listUsers = async (req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany({})
    res.status(200).json(allUsers);
}

export const UserController = {
    addUser,    //create
    listUsers,  //read
}