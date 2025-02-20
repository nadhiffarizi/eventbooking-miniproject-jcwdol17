import { serverHost } from "@/config"

export const uploadAvatar = async (formData: FormData, accessToken: string) => {
    const r = await fetch(serverHost + "api/user/uploadphoto", {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    // const res = r.json()

    // return res
}

export const updateData = async (userData: any, accessToken: string) => {
    const r = await fetch(serverHost + "api/user/update", {
        method: 'PATCH',
        body: JSON.stringify(userData), // first_name, last_name, optional: currentpass and newpassword
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Content-Type": 'application/json'
        }
    })

    // const res = await r.json()
    return r
}