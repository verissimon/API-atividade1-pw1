import { prisma } from "../database/prisma"

const create = async ( name: string, username: string) => {
    return await prisma.user.create({
        data: {
            name,
            username,
        }
    })
}

const findAll = async () => {
    return await prisma.user.findMany({
        include: { technologies: true }
    })
}

const findByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username },
        include: { technologies: true }
    })
}

const findById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id }
    })
}
export const userServices = {
    create,
    findAll,
    findByUsername,
    findById
}