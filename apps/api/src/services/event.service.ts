import { Request } from "express";
import { prisma } from "../config"; // Pastikan prisma diatur dengan benar
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { statusEnum } from "../helper/statusEnum.helper";
import { hashedPassword } from "../helper/bcrypt";
import { generateRandomString } from "ts-randomstring/lib";
import { sendEmailForgetPass } from "../helper/User/userService.helper";
import { cloudinaryUpload } from "../helper/cloudinary";

class EventService {
  // Get all events
  public async getAllEvents(): Promise<any> {
    try {
      const events = await prisma.event.findMany();
      return {
        status: statusEnum.SUCCESS,
        data: events
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Unable to fetch events");
    }
  }

  public async eventDetail(req: Request): Promise<any> {
    const { id } = req.params;
    try {
      const events = await prisma.event.findUnique({
        where: {
          id: Number(id)
        }
      });
      return {
        status: statusEnum.SUCCESS,
        data: events
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Unable to fetch events");
    }
  }

  public async searchEvent(req: Request): Promise<any> {
    const { query } = req.query;
    try {
      const events = await prisma.event.findMany({
        where: {
          event_name: {
            contains: String(query)
          }
        }
      });
      return {
        status: statusEnum.SUCCESS,
        data: events
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Unable to fetch events");
    }
  }

  public async payment(req: Request): Promise<any> {
    try {
      const events = await prisma.event.findMany();
      return {
        status: statusEnum.SUCCESS,
        data: events
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Unable to fetch events");
    }
  }
  public async createEvent(eventData: any): Promise<any> {
    try {
      const newEvent = await prisma.event.create({
        data: eventData
      });
      return {
        status: statusEnum.SUCCESS,
        data: newEvent
      };
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error("Unable to create event");
    }
  }
}

export default new EventService();
