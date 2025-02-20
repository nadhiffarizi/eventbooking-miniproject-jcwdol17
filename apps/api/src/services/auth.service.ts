import { Request } from "express";
import { jwtAccessSecret, jwtRefreshSecret, prisma } from "../config";
import { hashedPassword } from "../helper/bcrypt";
import { serviceFeedback } from "../interface/serviceFeedback.interface";
import { userDataCompletionCheck, userExistCheck, getFriendReferral, generateReferralCode, addCoupon, couponExpiry } from "../helper/AuthService/authService.helper";
import { statusEnum } from "../helper/statusEnum.helper";
import { sign } from "jsonwebtoken";
import { userLogin } from "../interface/userAuthorize.interface";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { generateAuthToken } from "../helper/token";
import { getUserByEmail } from "../helper/AuthService/authService.helper";

class AuthService {

    // Register
    async register(req: Request) {
        // check completion data
        if (userDataCompletionCheck(req).status === statusEnum.FAILED) {
            return userDataCompletionCheck(req)
        }

        // check if user already exist
        if ((await userExistCheck(req, 'register')).status === statusEnum.FAILED) {
            return userExistCheck(req, 'register')
        }

        // destructure data
        const { first_name, last_name, password, role, email, referral_code } = req.body

        // 
        // generate new user
        const hashedPass = await hashedPassword(password, 10)



        try {
            await prisma.user.create({
                data: {
                    image_url: null,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    password: hashedPass,
                    role: (role as string).toUpperCase(),
                    friend_referral_code: await getFriendReferral(referral_code),
                    created_at: new Date(),
                    point_balance: 0,
                    point_expired_date: null,
                    referral_code: await generateReferralCode(first_name),
                    coupon: await addCoupon(referral_code),
                    coupon_expired: await couponExpiry(referral_code)
                }
            })
            const feedback: serviceFeedback = {
                code: 201,
                data: null,
                message: 'success created new user',
                status: statusEnum.SUCCESS
            }
            return feedback

        } catch (error) {
            const feedback: serviceFeedback = {
                code: 401,
                data: error,
                message: 'failed writing new user to DB',
                status: statusEnum.FAILED
            }
            return feedback
        }

    }

    // Login
    async login(req: Request) {
        const { email, password } = req.body
        // check completion data
        if (!email || !password) {
            const feedback: serviceFeedback = {
                code: 400,
                data: null,
                status: statusEnum.FAILED,
                message: "login data incomplete"
            }
            return feedback
        }

        // check if email exist
        const getUser = await userExistCheck(req, 'login')
        if (getUser.status === statusEnum.FAILED) {
            return getUser
        }

        // check password
        const statusLogin = await compare(password, (getUser.data as User).password)

        if (statusLogin) {
            const userData: userLogin = {
                id: (getUser.data as User).id,
                email: (getUser.data as User).email,
                first_name: (getUser.data as User).first_name,
                last_name: (getUser.data as User).last_name,
                role: (getUser.data as User).role,
                imgUrl: (getUser.data as User).image_url
            }
            // const accessToken = sign(userData, jwtAccessSecret, { expiresIn: "20m" }) // access_token valid for 20 mins
            const tokens = await generateAuthToken(userData)
            const feedback: serviceFeedback = {
                code: 200,
                data: { ...tokens },
                status: statusEnum.SUCCESS,
                message: "login successful"
            }
            return feedback
        } else {
            const feedback: serviceFeedback = {
                code: 401,
                data: statusLogin,
                status: statusEnum.FAILED,
                message: "login failed, wrong password"
            }
            return feedback
        }
    }

    // refreshToken
    async refreshToken(req: Request) {
        if (!req.user?.email) {
            const feedback: serviceFeedback = {
                code: 401,
                data: req.user,
                status: statusEnum.FAILED,
                message: "refresh token unauthorized"
            }
            return feedback
        }

        const tokens = await generateAuthToken(undefined, req.user.email)
        const userData = (await getUserByEmail(req.user.email)) as userLogin
        if (!tokens) {
            const feedback: serviceFeedback = {
                code: 401,
                data: tokens,
                status: statusEnum.FAILED,
                message: "refresh token unauthorized"
            }
            return feedback
        }

        const feedback: serviceFeedback = {
            code: 200,
            data: { ...tokens },
            status: statusEnum.SUCCESS,
            message: "refresh token success"
        }
        return feedback

    }



}

export default new AuthService();

