import { Technology } from "../data/typeDefinitions";
import { users, prisma } from "../data/database";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { BadRequestError } from "../helpers/apiErrors";
import { Prisma } from "@prisma/client";

const listUserTechs = async (req: Request, res: Response) => {
    const { username } = req.headers
    try {
        const user = await prisma.user.findFirst({
            where: { username: username as string }
        })

        const tech = await prisma.technology.findMany({
            where: { studentId: user?.id }
        })

        return res.json(tech)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }
}

const createUserTech = async (req: Request, res: Response) => {
    const { username } = req.headers
    const { title, deadline } = req.body

    try {
        if (!title || !deadline) {
            return res.status(400).json({ message: "Title and deadline are required" })
        }
        const user = await prisma.user.findFirst({
            where: { username: username as string }
        })

        const techExists = await prisma.technology.findFirst({
            where: { studentId: user?.id, title: title }
        })

        if (techExists) {
            return res.status(400).json({ message: "Technology already exists" })
        }

        const newTech = await prisma.technology.create({
            data: {
                title,
                deadline: new Date(deadline),
                studentId: user?.id
            }
        })
        return res.status(201).json(newTech)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }

}

const updateTitleDeadline = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, deadline } = req.body

    if (!title || !deadline) {
        return res.status(400).json({ message: "Title and deadline are required" })
    }

    try {
        const updatedTechnology = await prisma.technology.update({
            where: { id: id as string },
            data: { title, deadline: new Date(deadline) }
        })
        return res.json({ message: "Update successful", technology: updatedTechnology }) 
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred while updating the technology" })
    }
}

const updateStudied = async (req: Request, res: Response) => {
    const { username } = req.headers
    const { id } = req.params

    try {
        const user = await prisma.user.findFirst({
            where: { username: username as string },
            include: { technologies: true }
        })

        const technology = user?.technologies.find(tech => tech.id === id)

        await prisma.technology.update({
            where: { id },
            data: { studied: !technology?.studied }
        })

        return res.json({ message: "Update successful" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred while updating the technology" })
    }
}
const deleteTech = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await prisma.technology.delete({
            where: { id },
        })
        return res.json({ message: "Technology deleted successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred while deleting the technology" })
    }
}
export const techController = {
    listUserTechs,
    createUserTech,
    updateTitleDeadline,
    updateStudied,
    deleteTech
}
