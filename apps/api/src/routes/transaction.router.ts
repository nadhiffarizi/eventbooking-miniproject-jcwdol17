import { Router } from "express"
import { verifyToken } from "../middlewares/authorize.middleware";
import transactionController from "../controller/transaction.controller";


export const transactionRoute = () => {
    const router = Router();
    router.post('/create', verifyToken, transactionController.createTransaction)
    router.post('/accept/:id', verifyToken, transactionController.acceptTransaction)
    router.post('/reject/:id', verifyToken, transactionController.rejectTransaction)
    router.get('/:id', verifyToken, transactionController.getTrxById)
    router.get('/pending/:organizer_id/:offset/:take', verifyToken, transactionController.getPendingTrx)
    router.get('/pending/totalpage/:organizer_id', verifyToken, transactionController.getPendingTrxTotalPage)

    return router
}