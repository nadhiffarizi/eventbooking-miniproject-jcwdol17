import { Request, Response, NextFunction } from "express"
import authService from "../services/auth.service"
import { responseHandler } from "../helper/responseHandler.helper"
import { serviceFeedback } from "../interface/serviceFeedback.interface"

class AuthController {
    // register
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            // try registering
            const data: serviceFeedback = await authService.register(req)
            responseHandler(res, data.message, data.status, data.data, data.code)

        } catch (error) {
            next(error)
        }
    }

    // login 
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            // try login
            const data: serviceFeedback = await authService.login(req)
            responseHandler(res, data.message, data.status, data.data, data.code)
        } catch (error) {
            next(error)
        }
    }

    //refresh token
    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            // try login
            const data: serviceFeedback = await authService.refreshToken(req)
            responseHandler(res, data.message, data.status, data.data, data.code)
        } catch (error) {
            next(error)
        }
    }

}

export default new AuthController()