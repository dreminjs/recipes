import { User } from "@prisma/client"


export type SendTwoFaSecretDto = {
    secret: string
} & Pick<User, "email" | "nickname">