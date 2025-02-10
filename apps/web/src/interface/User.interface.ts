import { Role } from "@/enum/role.enum";

export interface IUserRegister {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    refCode?: string,
    role: string,
}

export interface IUserLogin {
    email: string,
    password: string,
}