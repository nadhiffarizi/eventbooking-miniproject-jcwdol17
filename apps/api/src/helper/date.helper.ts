export const calculateDeadline = (now: Date, exp: number) => {
    const expDate = new Date(now.setDate(now.getDate() + exp))

    return expDate
}