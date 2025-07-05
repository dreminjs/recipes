import { User } from "@prisma/client";


export interface ISendEmailConfirmMailDto {
    urlConfirmAddress: string
    user: Pick<User,"email" | "nickname">;
}