import express, { Application } from "express";
import { userRoute } from "./routes/user.router";
import { authRoute } from "./routes/auth.router";
import { PORT } from "./config";
import cors from 'cors'
import { eventRoute } from "./routes/event.router";
import { cronCouponExpiry, cronPointExpiry } from "./helper/cron";
import { transactionRoute } from "./routes/transaction.router";
import { dashboardRoute } from "./routes/dashboard.router";

export class App {
    private app: Application;
    constructor() {
        this.app = express();
        this.configure();
        this.routes();
        this.cronJobs()
    }

    private configure() {
        // for middleware
        this.app.use(express.json()) // handle request body
        this.app.use(cors())

    }

    private routes() {
        this.app.use("/api/user", userRoute())
        this.app.use("/api/auth", authRoute())
    }

    public start() {
        this.app.listen(PORT, () => {
            console.log("api listening from ", PORT);
        })
    }
}