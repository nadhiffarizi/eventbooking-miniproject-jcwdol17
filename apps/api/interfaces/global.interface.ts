import { UserLogin } from "./user.interfaces";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserLogin;
  }
}
