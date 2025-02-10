import { serverHost } from "@/config";

export const registerUserRequest = async (userData: any) => {
    const feedback = await fetch(`${serverHost}api/auth/register`, {
        body: JSON.stringify(userData),
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })

    // console.log(serverHost, "/api/auth/register");
    // console.log("feedback server", feedback);

    if (!feedback) return new Error("request register failed")

    return feedback

    // console.log(userData);

}


