import { NextFunction } from "express";
import { Request, Response } from "express";
import { responseHandler } from "../helper/responseHandler.helper";
import { getUserByEmail } from "../helper/AuthService/authService.helper";
import eventService from "../services/event.service";
import dashboardService from "../services/dashboard.service";


class dashboardController {
    // get recap
    public async getRecap(req: Request, res: Response, next: NextFunction) {
        try {
            // try getting recap
            const feedback = await dashboardService.getRecap(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }




}

export default new dashboardController()