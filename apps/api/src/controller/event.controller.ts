import { NextFunction } from "express";
import { Request, Response } from "express";
import { responseHandler } from "../helper/responseHandler.helper";
import { getUserByEmail } from "../helper/AuthService/authService.helper";
import eventService from "../services/event.service";


class EventController {
    // create event
    public async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an event
            const feedback = await eventService.createEvent(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // get manage event total page 
    public async getTotalEventPage(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an event
            const feedback = await eventService.getTotalEventPage(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // get event by organizer
    public async getManageEventList(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an event
            const feedback = await eventService.getManageEventList(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // get registrant list
    public async getRegistrantList(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an event
            const feedback = await eventService.getRegistrantList(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // get event data
    public async getEventDetails(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an event
            const feedback = await eventService.getEventDetails(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // update event data
    public async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an event
            const feedback = await eventService.updateEvent(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }





}

export default new EventController()