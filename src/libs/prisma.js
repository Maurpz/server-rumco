import { PrismaClient } from '@prisma/client'
export var prisma = global.prisma || new PrismaClient()

if (process.env.NODE !== 'production') global.prisma = prisma