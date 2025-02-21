export const calculateDeadline = (now: Date | null, exp: number) => {

    if (!now) {
        const newDate = new Date()
        newDate.setDate((new Date()).getDate() + 30)
        return newDate

    } else {
        now.setDate(now.getDate() + exp)
        return now
    }



}