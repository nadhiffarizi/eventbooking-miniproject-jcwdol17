import { serverHost } from "@/config"

export const getUserInfo = async (accessToken: string) => {
    const res = await fetch(serverHost + "api/user/info", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    const r = await res.json()
    return r

}