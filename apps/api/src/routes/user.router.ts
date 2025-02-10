import { Router } from "express"
import userController from "../controller/user.controller"
import { verifyToken } from "../middlewares/authorize.middleware";
import { uploader } from "../helper/multer";

export const userRoute = () => {
    const router = Router();

    router.post('/resetpassword', userController.resetPassword) // callback
    router.patch('/update', verifyToken, userController.updateUser) // callback
    router.post('/uploadphoto', verifyToken, uploader().single("image"), userController.updateAvatar) // callback. checking 2 times through middleware
    router.get("/info", verifyToken, userController.getUserInfo) // callback

    return router
}