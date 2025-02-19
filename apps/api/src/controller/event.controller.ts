import { Request, Response, NextFunction } from "express";
import EventService from "../services/event.service";

class EventController {
  public async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.getAllEvents();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async searchEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.searchEvent(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async payment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.payment(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async eventDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EventService.eventDetail(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new EventController();
