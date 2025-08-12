import z from "zod";
import { PostRecipeFormSchema } from "../schemas/recipe.schema";
import { IRecipeIngredientPayload, IRecipeStepPayload } from "interfaces";

export type IPostRecipeForm = z.infer<typeof PostRecipeFormSchema>;

export type CreateRecipeDto = {
    holidayId: string
    nationalCuisineId: string
    typeId: string
    steps: IRecipeStepPayload[]
    ingredients: IRecipeIngredientPayload[]
} & IPostRecipeForm