
import { z } from "zod"

export const UpdateAmountIngredientSchema = z.object({
    amount: z.number().min(1,"Минимальное кол-во - 1").max(10000, "Максимальное кол-во 10000")
})