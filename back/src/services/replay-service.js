import prisma from "../models/prisma.js";

export function saveReplay( data ) { return prisma.replay.create({ data })}

export function getReplayByReplayId({ id }) { return prisma.replay.findUnique({ where: { id } })}

export function getAllReplayByUserId({ userId }) { return prisma.replay.findMany({ where: { userId } })}
