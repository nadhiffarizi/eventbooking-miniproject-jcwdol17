import { NextFunction } from "express";
import { Request, Response } from "express";
import userService from "../services/user.service";
import { responseHandler } from "../helper/responseHandler.helper";

class UserController {
  // get all users
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // try getting all users
    } catch (error) {
      next(error);
    }
  }

  // forget password
  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // try getting user
      const feedback = await userService.resetPassword(req);
      responseHandler(
        res,
        feedback.message,
        feedback.status,
        feedback.data,
        feedback.code
      );
    } catch (error) {
      next(error);
    }
  }

  // see profile
  public async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      // try getting user
      const feedback = await userService.getUser(req);
      responseHandler(
        res,
        feedback.message,
        feedback.status,
        feedback.data,
        feedback.code
      );
    } catch (error) {
      next(error);
    }
  }

  // upload avatar
  public async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      // try update avatar
      const feedback = await userService.updateAvatar(req)
      responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
    } catch (error) {
      next(error)
    }
  }

  // update user 
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      // try update user data
      const feedback = await userService.updateUser(req)
      responseHandler(res, feedback.message, feedback.status, feedback.data, feedback.code)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();
