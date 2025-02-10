import { statusEnum } from "../helper/statusEnum.helper";

export interface serviceFeedback {
    status: statusEnum,
    message: string,
    data: any,
    code: number
}