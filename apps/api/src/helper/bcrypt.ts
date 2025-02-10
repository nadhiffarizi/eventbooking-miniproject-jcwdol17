import { genSalt, hash, hashSync } from "bcrypt"

export const hashedPassword = async (password: string, saltNumber: number = 5) => {
    const salt = await genSalt(saltNumber)
    const modifiedPass = await hash(password, salt)
    return modifiedPass
}