import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { auth_secret, serverHost } from "@/config";

export const refreshToken = async () => {
    const cookie = cookies();
    const ftoken = (await cookie).get("authjs.session-token")?.value;
    const be_token = await decode({
        token: ftoken,
        salt: "authjs.session-token",
        secret: auth_secret!
    })

    // console.log("current refresh token", be_token?.refreshToken);


    const res = await fetch(serverHost + "api/auth/token", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
            'Authorization': `Bearer ${be_token?.refreshToken}`,
            'Content-Type': 'application/json'
        }
    });

    const newTokens = await res.json()
    // console.log("test", newTokens);

    return newTokens["data"]
};