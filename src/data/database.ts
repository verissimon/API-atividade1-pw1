import { UserBody } from "./typeDefinitions";
import { PrismaClient } from "@prisma/client";

export const users = [] as UserBody[]
export const prisma = new PrismaClient()
