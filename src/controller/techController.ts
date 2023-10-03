import { Technology } from "../data/typeDefinitions";
import users from "../data/database";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { BadRequestError } from "../helpers/apiErrors";

const listUserTechs = (req: Request, res: Response) => {
    const { username } = req.headers;
    const user = users.find( uname => 
        uname.username === username as string
    )
    return res.json(user?.technologies);
}

const createUserTech = (req: Request, res: Response) => {
    const { username } = req.headers
    const { title, deadline } = req.body
    const user = users.find( uname => 
        uname.username === username as string)
        
    const techExists = user?.technologies.find(
        tech => tech.title === title)
    if(techExists)
        throw new BadRequestError("Technology already exists for this user")

    if(!title || !deadline){
        throw new BadRequestError("Title and deadline are required")
    }

    const technology: Technology = {
        id: uuid(),
        title: title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date(),
    }

    user?.technologies.push(technology)
    return res.status(201).json(technology)
}

const updateTitleDeadline = (req: Request, res: Response) => {
    const { username } = req.headers
    const { id } = req.params
    const { title, deadline } = req.body
    if (!title || !deadline) {
        throw new BadRequestError("Title or deadline are required")
    }
    const user = users.find( uname => 
        uname.username === username as string)
 
    user?.technologies.map((tech) => {
    if (tech.id === id) {
      tech.title = title
      tech.deadline = deadline
    }
    return res.json({ message: "update feito com sucesso" })
  })
}

const updateStudied = (req: Request, res: Response) => {
    const { username } = req.headers
    const { id } = req.params
    const user = users.find( uname => uname.username === username as string)
    user?.technologies.map( tech => {
    if (tech.id === id) 
      tech.studied = !tech.studied
    })
    return res.json({ message: "update feito com sucesso" })
}

const deleteTech = (req: Request, res: Response) => {
    const { username } = req.headers
    const { id } = req.params
    const user = users.find( uname => uname.username === username as string)
    const tech = user?.technologies.find(
        tech => tech.id === id)
    const index = user?.technologies.indexOf(tech as Technology)
    user?.technologies.splice(index!, 1)
    return res.json({ message: "tecnologia deletada com sucesso" })
}

export const techController = {
    listUserTechs,
    createUserTech,
    updateTitleDeadline,
    updateStudied,
    deleteTech
}
