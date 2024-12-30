import { z } from "zod";
import { UserSchema } from "./schemas/user.schema";

export type IUserForm = z.infer<typeof UserSchema>;