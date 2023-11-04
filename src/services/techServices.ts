import { prisma } from "../database/prisma"
import { userServices } from "./userServices"

const findById = async (id: string) => {
    return await prisma.technology.findUnique({
        where: {
            id
        }
    })
}
const findByStudentId = async (studentId: string) => {
    return await prisma.technology.findMany({
        where: { studentId }
    })
}
const findByStudentUsername = async (username: string, techId: string) => {
    const user = await userServices.findByUsername(username as string)
    return await prisma.technology.findFirst({
        where: { id: techId, studentId: user?.id}
    })   
}
const create = async (title: string, deadline: Date, studentId: string) => {
    return await prisma.technology.create({
        data: {
            title,
            deadline,
            studentId
        }
    })
}

const patchStudied = async (id: string, studied: boolean) => {
    await prisma.technology.update({
        where: { id },
        data: { studied }
    })
}
const update = async (title: string, deadline: Date, id: string) => {
    return await prisma.technology.update({
        where: { id },
        data: { title, deadline }
    })
}
const del = async (id: string) => {
    await prisma.technology.delete({
        where: { id },
    })
}
export const techServices = {
    findById,
    findByStudentId,
    findByStudentUsername,
    create,
    update,
    patchStudied,
    del,
}