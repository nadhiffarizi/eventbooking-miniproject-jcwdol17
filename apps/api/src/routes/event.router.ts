import { NextFunction, Request, Response, Router } from "express"
import { verifyRefreshToken, verifyToken } from "../middlewares/authorize.middleware";
import eventController from "../controller/event.controller";


export const eventRoute = () => {
    const router = Router();
    router.get("/get", eventController.getAllEvents);
    router.get("/eventdetail/:id", eventController.eventDetail);
    router.get("/search", eventController.searchEvent); // mau nge-GET data event di searchbar
    router.post("/payment", eventController.payment); // route ke payment -> ke landing payment
    router.post('/create', verifyToken, eventController.createEvent)
    router.get('/list/:organizer_id/:offset/:take', verifyToken, eventController.getManageEventList)
    router.get('/attendee/list/:slug', verifyToken, eventController.getRegistrantList)
    router.get('/totalpage/:organizer_id', verifyToken, eventController.getTotalEventPage)
    router.get('/details/:slug', verifyToken, eventController.getEventDetails)
    router.patch('/update/:slug', verifyToken, eventController.updateEvent)
    return router
}