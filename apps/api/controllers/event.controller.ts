import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler } from "../helpers/response.handler";
import eventService from "../services/event.service";

class EventController {
  async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.body.event_name || !req.body.userId) {
        throw new ErrorHandler("Event name and user ID are required", 400);
      }

      await eventService.create(req);
      responseHandler(res, "New event has been created", undefined, 201);
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.params.id) {
        throw new ErrorHandler("Event ID is required", 400);
      }

      await eventService.update(req);
      responseHandler(res, "Event has been updated");
    } catch (error) {
      next(error);
    }
  }

  // async deleteEvent(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     if (!req.params.id) {
  //       throw new ErrorHandler("Event ID is required", 400);
  //     }

  //     await eventService.delete(req);
  //     responseHandler(res, "Event has been deleted");
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await eventService.getList(req);
      responseHandler(res, "Fetching events", data);
    } catch (error) {
      next(error);
    }
  }

  async getEventBySlug(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.params.slug) {
        throw new ErrorHandler("Event slug is required", 400);
      }

      const data = await eventService.getBySlug(req);
      if (!data) {
        throw new ErrorHandler("Event not found", 404);
      }

      responseHandler(res, "Fetching event with slug", data);
    } catch (error) {
      next(error);
    }
  }
}

const eventController = new EventController();
export default eventController;
