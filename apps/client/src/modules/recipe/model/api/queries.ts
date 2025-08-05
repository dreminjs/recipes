import { useMutation } from "@tanstack/react-query"
import { CreateRecipeDto } from "../types/create-recipe.dto"
import { createOne } from "./services"

export const usePostRecipe = () => {
    return useMutation({
        mutationFn: (data: CreateRecipeDto) => createOne({
            ...data
        })
    })
}