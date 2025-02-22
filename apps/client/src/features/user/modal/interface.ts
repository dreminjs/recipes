import { z } from "zod";
import { UserSchema } from "./schema";

export type IUserForm = z.infer<typeof UserSchema>;