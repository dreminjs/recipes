
import { z } from "zod"
import { UpdateAmountIngredientSchema } from "../schemas/ingredient.schema"

export type TUpdateIngredientAmountDto = z.infer<typeof UpdateAmountIngredientSchema>