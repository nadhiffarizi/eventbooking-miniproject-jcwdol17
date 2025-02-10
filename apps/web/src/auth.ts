import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { IUserLogin } from "./interface/User.interface";
import { serverHost } from "./config";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "./helper/auth/refreshToken";

interface IFeedback {
    message: string,
    data: any
}

interface ITokenUser {
    accessToken: string,
    refreshToken: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 4
    },
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {

                let user = null
                // logic to verify if the user exists
                const userData: IUserLogin = {
                    email: String(credentials.email),
                    password: String(credentials.password)
                }
                const feedback = await fetch(`${serverHost}api/auth/login`, {
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password
                    }),
                    method: 'POST',
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    }
                })

                const data = (await feedback.json()) as IFeedback

                user = data.data
                console.log("user", user);

                if (!user) {
                    // No user found, so this is their first attempt to login
                    throw new Error("wrong email/password")

                }
                return user
            },
        }),


    ],
    pages: {
        signIn: "/login", // link to <host>/api/auth/signin,
        signOut: "/",
        newUser: "/login"
    },
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                console.log("token", token);
                const { accessToken, refreshToken } = user
                return { accessToken, refreshToken }
            }
            else if (token.refreshToken || trigger === "update") {
                const newToken = await refreshToken()
                return newToken
            }

            return token
        },

        async session({ session, token }) {
            if (token.accessToken) {
                const user = jwtDecode(token.accessToken!) as User

                session.user.id = user.id as string
                session.user.email = user.email as string
                session.user.first_name = user.first_name as string
                session.user.last_name = user.last_name as string
                session.user.role = user.role as string
                session.user.image_url = user.image_url! as string
                session.user.accessToken = token.accessToken! as string
                session.user.refreshToken = token.refreshToken! as string
                console.log("Session", session);
            }
            return session
        }
    }
})