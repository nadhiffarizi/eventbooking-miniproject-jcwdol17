import { Prisma } from "@prisma/client";
import e, { Request } from "express";
import { slugGenerator } from "../helpers/slug.generator";
import { prisma } from "../config";
import { pagination } from "../helpers/pagination";

class EventService {
  async create(req: Request) {
    const {
      event_name,
      image_url,
      price,
      speaker,
      location,
      created_at,
      date,
      capacity,
      description,
      userId
    } = req.body;

    if (!event_name || !userId) {
      throw new Error("Event name and user ID are required.");
    }

    const data: Prisma.EventCreateInput = {
      event_name: event_name,
      image_url: image_url,
      price: price,
      speaker: speaker,
      slug: slugGenerator(event_name),
      organizer: {
        connect: { id: userId }
      },
      location: location,
      created_at: created_at,
      date: date,
      capacity: capacity,
      description: description
    };

    return await prisma.event.create({ data });
  }

  async update(req: Request) {
    const id = Number(req.params.id);
    const { event_name, img_src, price } = req.body;

    const data: Prisma.EventUpdateInput = {};
    if (event_name) data.event_name = event_name;
    if (img_src) data.image_url = img_src;
    if (price) data.price = price;

    return await prisma.event.update({
      where: { id },
      data
    });
  }

  // async delete(req: Request) {
  //   const id = Number(req.params.id);
  //   return await prisma.event.update({
  //     where: { id },
  //     data: { isDeleted: new Date() }
  //   });
  // }

  async getBySlug(req: Request) {
    const { slug } = req.params;
    return await prisma.event.findUnique({
      where: { slug }
    });
  }

  async getList(req: Request) {
    const { page, event_name } = req.query;
    return await prisma.event.findMany({
      where: {
        event_name: {
          contains: String(event_name || ""),
          mode: "insensitive"
        }
      },
      ...pagination(Number(page))
    });
  }
}

// const eventService = new EventService();
export default new EventService();
