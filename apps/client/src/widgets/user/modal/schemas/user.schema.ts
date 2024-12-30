import { z } from 'zod';

export const UserSchema = z.object({
    nickname: z.string().min(3, "Nickname must be at least 3 characters long").max(100, "Nickname must be at most 100 characters long"),
    email: z.string().email("Email must be valid"),
});
