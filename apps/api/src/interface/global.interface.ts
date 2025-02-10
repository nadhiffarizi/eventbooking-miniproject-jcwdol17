/**@format */

import { userLogin } from "./userAuthorize.interface";

declare global {
    namespace Express {
        export interface Request {
            user?: userLogin
        }
        export interface Response {
            user?: userLogin
        }
    }
}