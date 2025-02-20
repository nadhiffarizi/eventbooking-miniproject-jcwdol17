import { Request } from "express";
import { prisma } from "../config";
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { statusEnum } from "../helper/statusEnum.helper";
import { getUserByEmail } from "../helper/AuthService/authService.helper";

class DashboardService {

    // create event
    public async getRecap(req: Request) {
        //     const { email, event_name, speaker, location, date, capacity, price, description } = req.body

        //     // find event and user 
        //     const organizerData = await getUserByEmail(String(email!))
        //     if (!organizerData) {
        //         const feedback: serviceFeedback = {
        //             status: statusEnum.FAILED,
        //             message: "Organizer is invalid",
        //             data: null,
        //             code: 400
        //         }
        //         return feedback;
        //     }
        //     try {
        //         await prisma.event.create({
        //             data: {
        //                 organizer_id: organizerData?.id,
        //                 speaker: speaker as string,
        //                 event_name: event_name,
        //                 location: location,
        //                 date: new Date(),
        //                 price: Number(price),
        //                 description: description,
        //                 image_url: "",
        //                 capacity: Number(capacity),
        //                 seat_available: Number(capacity),
        //                 created_at: new Date(),
        //                 slug: String(event_name)
        //             }
        //         })
        //         const feedback: serviceFeedback = {
        //             status: statusEnum.FAILED,
        //             message: "test create event",
        //             data: null,
        //             code: 200
        //         }
        //         return feedback;
        //     } catch (error) {
        //         const feedback: serviceFeedback = {
        //             status: statusEnum.FAILED,
        //             message: "Create event failed",
        //             data: null,
        //             code: 400
        //         }
        //         return feedback;
        //     }
        const feedback: serviceFeedback = {
            status: statusEnum.FAILED,
            message: "test get recap data",
            data: null,
            code: 200
        }
        return feedback;

    }

}

export default new DashboardService();