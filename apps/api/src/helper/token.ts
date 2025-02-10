import { sign } from "jsonwebtoken";
import { userLogin } from "../interface/userAuthorize.interface";
import { jwtAccessSecret, jwtRefreshSecret } from "../config";
import { User } from "@prisma/client";
import { getUserByEmail } from "./AuthService/authService.helper";

export const generateAuthToken = async (user?: userLogin, emailInput?: string) => {
    const existingUser = user || ((await getUserByEmail(emailInput!)) as userLogin)
    if (!existingUser) return null
    const accessToken = sign(existingUser, jwtAccessSecret, {
        expiresIn: "4h"
    })

    const refreshToken = sign({ email: existingUser.email }, jwtRefreshSecret, {
        expiresIn: "6h"
    })

    // console.log(existingUser);


    return { accessToken, refreshToken }
}
