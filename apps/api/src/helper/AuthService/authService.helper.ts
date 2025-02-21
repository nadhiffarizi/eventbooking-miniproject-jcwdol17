import { Request } from "express";
import { prisma } from "../../config";
import { serviceFeedback } from "../../interface/serviceFeedback.interface";
import { User } from "@prisma/client";
import { generateRandomString } from "ts-randomstring/lib";
import { calculateDeadline } from "../date.helper";
import { statusEnum } from "../statusEnum.helper";
import cron from 'node-cron'

// user data completion check
export const userDataCompletionCheck = (req: Request) => {
    const { first_name, last_name, password, role, email, friend_referral_code } = req.body
    if (!first_name || !last_name || !password || !role || !email) {
        const feedback: serviceFeedback = {
            status: statusEnum.FAILED,
            message: "incomplete data",
            data: null,
            code: 400
        }
        return feedback
    } else {
        const feedback: serviceFeedback = {
            status: statusEnum.SUCCESS,
            message: "continue checking data",
            data: null,
            code: 100
        }
        return feedback
    }
}

// checking if user already exist
export const userExistCheck = async (req: Request, mode: string) => {
    const { email } = req.body
    // check if registered email already exist
    // console.log(email);

    const storedData = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (mode.includes('register'.toLowerCase())) {
        if (storedData) {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "user already exist",
                data: null,
                code: 400
            }
            return feedback;
        } else {
            const feedback: serviceFeedback = {
                status: statusEnum.SUCCESS,
                message: "user is not existed yet",
                data: null,
                code: 100
            }
            return feedback;
        }
    } else {
        // mode === 'login'
        console.log(storedData);

        if (storedData) {
            const feedback: serviceFeedback = {
                status: statusEnum.SUCCESS,
                message: "user exist",
                data: storedData,
                code: 200
            }
            return feedback;

        } else {
            const feedback: serviceFeedback = {
                status: statusEnum.FAILED,
                message: "email does not exist",
                data: null,
                code: 401
            }
            return feedback;
        }
    }

}

// get friend referral if available
export const getFriendReferral = async (inputReferralCode: string) => {

    // if (!inputReferralCode) return null
    console.log("use referral code: ", inputReferralCode.trim());

    // check friend referral
    const friend = await prisma.user.findFirst({
        where: {
            referral_code: inputReferralCode
        }
    })

    if (!friend) { console.log("friend not found"); return }
    // else {
    //     console.log(friend);

    // }


    // // update friend points
    await prisma.user.update({
        where: {
            email: friend?.email!,
        }, data: {
            point_balance: Number(friend.point_balance) + 10000,
            point_expired_date: calculateDeadline(friend.point_expired_date, 30), // nanti handle date
            updated_at: new Date(Date.now())
        }
    })

    const friendUpdate = await prisma.user.findFirst({
        where: {
            referral_code: inputReferralCode.toUpperCase()
        }
    })

    if (!friend) { console.log("friend not found"); } else {
        console.log("upodate", friendUpdate);

    }

    return inputReferralCode;

}

// get my referral code
export const generateReferralCode = async (inputFirstName: string) => {
    // the ref_code generated max 15 character
    let tempFirstName: string = "";
    const checkRefCodeExist = async (refCode: string) => {
        const data = await prisma.user.findFirst({
            where: {
                referral_code: refCode
            }
        })

        if (!data) return null
        return data
    }

    if (tempFirstName.length > 10) {
        tempFirstName = String(inputFirstName).substring(0, 10)
    } else {
        tempFirstName = String(inputFirstName)
    }
    const randomString = generateRandomString({
        length: 4
    })

    let refCode = `${tempFirstName}_${randomString}`

    let refCodeCheck = await checkRefCodeExist(refCode)
    while (refCodeCheck) {
        const randomString = generateRandomString({
            length: 4
        })

        let refCode = `${tempFirstName}_${randomString}`
        refCodeCheck = await checkRefCodeExist(refCode)
    }

    return refCode.toUpperCase()

}

// add coupon if applicable
export const addCoupon = async (inputReferralCode: string) => {
    if (!inputReferralCode) return 0

    return 5000 // if the user registered using referral code, then he/she gets 5000 coupon
}

// coupon expiry date
export const couponExpiry = async (inputReferralCode: string) => {
    if (!inputReferralCode) return null

    const expDate = calculateDeadline(new Date(), 30 * 3)
    return expDate

}

// get user by email
export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    // console.log(user);
    return user

}

