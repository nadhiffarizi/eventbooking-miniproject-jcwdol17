import { NextFunction, Request, Response, Router } from "express";
import eventController from "../controller/event.controller";
import { verifyToken } from "../middlewares/authorize.middleware";

export const eventRoute = () => {
  const router = Router();

  router.get("/get", eventController.getAllEvents);
  router.get("/eventdetail/:id", eventController.eventDetail);
  router.get("/search", eventController.searchEvent); // mau nge-GET data event di searchbar
  router.post("/payment", eventController.payment); // route ke payment -> ke landing payment
  // router.post("/create", verifyToken, eventController.createEvent);

  return router;
};
