import { NextFunction } from "express";
import { Request, Response } from "express";
import { responseHandler } from "../helper/responseHandler.helper";
import { getUserByEmail } from "../helper/AuthService/authService.helper";
import eventService from "../services/event.service";
import transactionService from "../services/transaction.service";


class TransactionController {
    // create event
    public async createTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an transaction
            const feedback = await transactionService.createTransaction(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // accept transaction
    public async acceptTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            // try accept transaction
            const feedback = await transactionService.acceptTransaction(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // reject transaction
    public async rejectTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            // try creating an transaction
            const feedback = await transactionService.rejectTransaction(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    // get pending transaction
    public async getPendingTrx(req: Request, res: Response, next: NextFunction) {
        try {
            // try get pending trx with pagination
            const feedback = await transactionService.getPendingTrx(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    //get pending trx total page
    public async getPendingTrxTotalPage(req: Request, res: Response, next: NextFunction) {
        try {
            // try get pending trx total page
            const feedback = await transactionService.getPendingTrxTotalPage(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

    //get transaction data readonly
    public async getTrxById(req: Request, res: Response, next: NextFunction) {
        try {
            // try get  trx by id
            const feedback = await transactionService.getTrxById(req)
            responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
        } catch (error) {
            next(error)
        }
    }

}

export default new TransactionController()