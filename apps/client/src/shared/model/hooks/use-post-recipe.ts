import { useContext } from "react"
import { PostRecipeContext } from "@/application/"



export const usePostRecipe = () => {
    return useContext(PostRecipeContext)
}