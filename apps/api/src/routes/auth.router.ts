import { NextFunction, Request, Response, Router } from "express"
import authController from "../controller/auth.controller";
import { verifyRefreshToken, verifyToken } from "../middlewares/authorize.middleware";


export const authRoute = () => {
    const router = Router();

    router.post('/register', authController.register) // callback
    router.post('/login', authController.login) // callback
    router.post('/token', verifyRefreshToken, authController.refreshToken)
    router.get("/", verifyToken, (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({
            message: "hhaha"
        })
    })

    return router
}