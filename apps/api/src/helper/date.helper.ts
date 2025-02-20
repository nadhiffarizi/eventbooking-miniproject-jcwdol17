export const calculateDeadline = (now: Date | null, exp: number) => {

    if (!now) {
        const now = new Date()
        return now

    } else {
        now.setDate(now.getDate() + exp)
        return now
    }



}