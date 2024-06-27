import prisma from "../models/prisma.js";

export function createUser ({ data }) { return prisma.user.create({ data })}

export function getUserByEmail (email) { return prisma.user.findUnique({ where: { email }})}

export function getUserById (id) { return prisma.user.findUnique({ where: { id }})}

// export function updateUserByUserId (id,data) { return prisma.user.update({where: { id }, data})}