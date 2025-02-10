import { NextFunction, Request, Response, Router } from "express"
import authController from "../controller/auth.controller";
import { verifyRefreshToken, verifyToken } from "../middlewares/authorize.middleware";


export const eventRoute = () => {
    const router = Router();

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({
            message: "test drive"
        })
    }) // callback

    return router
}