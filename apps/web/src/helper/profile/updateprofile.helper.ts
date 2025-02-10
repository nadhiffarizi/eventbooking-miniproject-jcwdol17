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