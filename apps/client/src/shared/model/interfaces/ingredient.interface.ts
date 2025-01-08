import { z } from "zod";
import { ingredientFormSchema } from "../schemas/ingredient.schema";


export type IIngredientForm = z.infer<typeof ingredientFormSchema>;