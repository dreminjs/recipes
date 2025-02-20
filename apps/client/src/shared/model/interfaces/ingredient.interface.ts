import { z } from "zod";
import { IngredientFormSchema } from "../schemas/ingredient.schema";

export type IPostIngredientForm = z.infer<typeof IngredientFormSchema>;