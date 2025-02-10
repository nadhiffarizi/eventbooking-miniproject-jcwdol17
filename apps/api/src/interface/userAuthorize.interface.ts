import { Role } from "@prisma/client";

export interface userLogin {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    role: Role,
    imgUrl?: string | null
}