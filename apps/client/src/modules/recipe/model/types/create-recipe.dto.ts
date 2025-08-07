import z from "zod";
import { PostRecipeFormSchema } from "../schemas/recipe.schema";

export type IPostRecipeForm = z.infer<typeof PostRecipeFormSchema>;

export type CreateRecipeDto = {
    holidayId: string
    nationalCuisineId: string
    typeId: string
} & IPostRecipeForm