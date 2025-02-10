import { Response } from "express";
import { statusEnum } from "./statusEnum.helper";

export class ErrorHandler extends Error {
    private code: number;
    constructor(message: string, code?: number) {
        super(message)
        this.code = code || 404
    }
}

export const responseHandler = (res: Response, message: string, status: statusEnum, data?: any, code?: number) => {

    return res.status(code || 200).send({
        message: message,
        data: data
    })
}