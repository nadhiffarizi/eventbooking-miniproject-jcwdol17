import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// ORM
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        })

        res.status(201).send({
            rc: 201,
            success: true,
            message: "add data success"
        })
    } catch (error) {
        console.log(error);

    }
}