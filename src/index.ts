import { UUID } from 'crypto'
import express from 'express'
import { v4 as uuid } from 'uuid'

const server = express()
server.use(express.json())

type Technology = {
    title: string,
    deadline: Date
}

type UserBody = {
    id: string,
    name: string,
    username: string,
    technologies: Technology[]
}

const users = [] as UserBody[]

// rotas relacionadas a usuario
server.post('/users', (req, res) => {
    const { name, username } = req.body as UserBody

    const userExists = users.some( user => user.username === username )

    if(userExists)
        return res.status(400).json({error: 'ja existe'})
    

    const newUser: UserBody = {
        id: uuid(),
        name,
        username,
        technologies: []
    }
    users.push(newUser)
    return res.status(201).json(newUser)
})

// rotas relacionadas com a tecnologias do usuario


const port = 3000
server.listen(port, () => {
    console.log(`server online on port ${port}`);
})