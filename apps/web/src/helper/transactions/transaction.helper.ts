import { serverHost } from "@/config"
import { User } from "next-auth"


export const getPendingTrx = async (userId: string | undefined, accessToken: string, offset: number, take: number) => {

    const r = await fetch(`${serverHost}` + `api/transaction/pending/${userId}/${offset}/${take}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    console.log(r);
    return r.json()
}

export const getPendingTrxTotalPage = async (accessToken: string | undefined, user: User) => {

    if (!accessToken || !user) {
        console.log("user or accessToken not available");
        return

    }

    const r = await fetch(`${serverHost}` + `api/transaction/pending/totalpage/${user.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return r.json()
}

export const acceptTrx = async (accessToken: string | undefined, trxId: number) => {
    if (!accessToken) {
        console.log("user or accessToken not available");
        return

    }

    const r = await fetch(`${serverHost}` + `api/transaction/accept/${trxId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return r.json()
}

export const rejectTrx = async (accessToken: string | undefined, trxId: number) => {
    if (!accessToken) {
        console.log("user or accessToken not available");
        return

    }

    await fetch(`${serverHost}` + `api/transaction/reject/${trxId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
}

