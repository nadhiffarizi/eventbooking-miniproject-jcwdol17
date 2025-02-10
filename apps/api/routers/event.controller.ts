import { Router, Request, Response } from "express";
import eventController from "../controllers/event.controller";

export const eventRouter = () => {
  const router = Router();

  router.get("/", eventController.getEvent);
  router.get("/:slug", eventController.getEventBySlug);
  router.post("/", (req: Request, res: Response) => {
    res.status(200).send({
      message: "it works"
    });
  });
  // router.delete("/:id", eventController.deleteEvent);
  router.patch("/:id", eventController.updateEvent);

  return router;
};
