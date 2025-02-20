import { NextFunction, Request, Response, Router } from "express"
import authController from "../controller/auth.controller";
import { verifyRefreshToken, verifyToken } from "../middlewares/authorize.middleware";
import dashboardController from "../controller/dashboard.controller";


export const dashboardRoute = () => {
    const router = Router();

    router.get('/recap', verifyToken, dashboardController.getRecap)

    return router
}