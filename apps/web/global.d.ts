/** @format */

declare module "next-auth" {
    interface User {
        id?: string | null | undefined;
        first_name?: string | null | undefined;
        last_name?: string | null | undefined;
        email?: string | null | undefined;
        image_url?: string | null | undefined;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        role?: string | undefined;
    }

    interface Session {
        user: User;
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    export interface JWT {
        accessToken: string | undefined,
        refreshToken: string | undefined
    }
}
