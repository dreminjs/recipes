import { z } from "zod";
import { SignInSchema } from "./schema";

export type ISignIn = z.infer<typeof SignInSchema>