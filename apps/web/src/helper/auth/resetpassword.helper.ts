import { serverHost } from "@/config";

export const resetPassword = async (userData: any) => {
    const feedback = await fetch(`${serverHost}api/user/resetpassword`, {
        body: JSON.stringify({
            ...userData
        }),
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })

    return feedback.json()

}


