import { PostRecipeFormSchema } from "../schemas/recipe.schema"

import { z } from "zod";

export interface IGetRecipesQueryParameters {
    typeId?: string
    holidayId?: string
    nationalCuisineId?: string
    cursor?: number
    take?: number
    limit?: number
    title?: string
}

export interface IGetRecipesSelectionQueryParameters {
    isType?: boolean
    isNationalCuisine?: boolean
    isHoliday?: boolean
    limit?: number
    cursor?: number
}

export type IPostRecipeForm = z.infer<typeof PostRecipeFormSchema>;