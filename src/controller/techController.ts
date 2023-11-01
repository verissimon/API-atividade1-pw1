import { Request, Response } from "express";
import { userServices } from "../services/userServices";
import { techServices } from "../services/techServices";

const listUserTechs = async (req: Request, res: Response) => {
    const { username } = req.headers
    try {
        const user = await userServices.findByUsername(username as string)
        const tech = await techServices.findByStudentId(user?.id as string)

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
        const user = await userServices.findByUsername(username as string)
        const tech = await techServices.findByStudentId(user?.id as string)

        const techExists = tech.some( tech => tech.title === title)
        if (techExists) {
            return res.status(400).json({ message: "Technology already exists" })
        }

        const newTech = await techServices.create(title, new Date(deadline), user?.id as string)
        return res.status(201).json(newTech)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred" })
    }

}

const updateTitleDeadline = async (req: Request, res: Response) => {
    const { username } = req.headers
    const { id } = req.params
    const { title, deadline } = req.body

    if (!title || !deadline) {
        return res.status(400).json({ message: "Title and deadline are required" })
    }

    try {
        const tech = await techServices.findByStudentUsername(username as string, id)
        if(!tech)
            return res.status(400).json({ message: "non-existent Technology for this user" })
        const updatedTechnology = await techServices.update(title, new Date(deadline), id)
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
        const tech = await techServices.findByStudentUsername(username as string, id)
        if(!tech)
            return res.status(400).json({ message: "non-existent Technology for this user" })

        techServices.patchStudied(tech?.id as string, true)
    
        return res.json({ message: "Update successful" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "An error occurred while updating the technology" })
    }
}
const deleteTech = async (req: Request, res: Response) => {
    const { id } = req.params
    const { username } = req.headers

    try {
        const tech = await techServices.findByStudentUsername(username as string, id)
        if(!tech)
            return res.status(400).json({ message: "non-existent Technology for this user" })

        techServices.del(id)
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
