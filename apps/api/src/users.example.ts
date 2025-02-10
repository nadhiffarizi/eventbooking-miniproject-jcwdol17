import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// ORM
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

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
        next(error);

    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, role } = req.query
        if (!first_name || !role) throw Error
        const usersData = await prisma.user.findMany({
            where: {
                first_name: String(first_name),
                role: role.toString()
            }
        });
        res.status(200).send({
            message: "fetch users",
            data: usersData
        })

    } catch (error) {
        next(error)
    }

}