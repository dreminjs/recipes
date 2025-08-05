import { IPostRecipeForm } from "@/shared";

export type CreateRecipeDto = {
    holidayId: string
    nationalCuisineId: string
    typeId: string
} & IPostRecipeForm