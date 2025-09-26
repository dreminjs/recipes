import { Recipe } from "@prisma/client"
import { FC } from "react"

type TProps = {
    stepsCount: number
    ingredientsCount: number
} & Pick<Recipe, "title" | "description">

export const RecipeInfo: FC<TProps> = (props) => {



    return (
        <div>
            <h3>
                {props.title}
            </h3>
            <p>
                {props.description}
            </p>
            <ul>

            </ul>
        </div>
    )
}