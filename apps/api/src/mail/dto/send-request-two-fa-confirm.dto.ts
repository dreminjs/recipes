import { User } from "@prisma/client";


export type ISendTwoFaConfirmMailDto = Pick<User,"id" | "nickname" | "email" >;
