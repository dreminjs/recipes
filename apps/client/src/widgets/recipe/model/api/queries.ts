import { useMutation } from "@tanstack/react-query"
import { createOne } from "./service"
import { CreateRecipeDto } from "../types/create-recipe.dto";





export const usePostRecipe = () => {


    return useMutation({
        mutationFn: (data: CreateRecipeDto) => createOne({
            ...data
        })
    })
}