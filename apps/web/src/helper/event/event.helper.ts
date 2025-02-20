import { serverHost } from "@/config"
import { Session, User } from "next-auth"

export const getEventManageList = async (userId: string | undefined, accessToken: string, offset: number, take: number) => {

    const r = await fetch(`${serverHost}` + `api/event/list/${userId}/${offset}/${take}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    console.log(r);


    return r.json()
}

export const getTotalEventPage = async (accessToken: string | undefined, user: User) => {

    if (!accessToken || !user) {
        console.log("user or accessToken not available");
        return

    }

    const r = await fetch(`${serverHost}` + `api/event/totalpage/${user.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return r.json()
}

export const getRegistrantList = async (accessToken: string, slug: string) => {
    if (!accessToken) {
        console.log("user or accessToken not available");
        return
    }

    const r = await fetch(`${serverHost}` + `api/event/attendee/list/${slug}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return r.json()
}

export const getEventDetails = async (accessToken: string, slug: string) => {
    if (!accessToken) {
        console.log("user or accessToken not available");
        return
    }

    const r = await fetch(`${serverHost}` + `api/event/details/${slug}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return r.json()
}

export const updateEvent = async (accessToken: string, data: any, slug: string) => {
    if (!accessToken) {
        console.log("user or accessToken not available");
        return
    }

    const r = await fetch(serverHost + `api/event/update/${slug}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })

    return r
}