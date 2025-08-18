import { typeAtom, nationalCuisineAtom, holidayAtom, stepsAtom, ingredientsAtom } from "@/app"
import { useSetAtom } from "jotai"


export const useClearRecipeAdditionals = () => {

    const setType = useSetAtom(typeAtom)
    const setHoliday = useSetAtom(holidayAtom)
    const setNationalCuisine = useSetAtom(nationalCuisineAtom)
    const setSteps = useSetAtom(stepsAtom)
    const setIngredients = useSetAtom(ingredientsAtom)

    return () => {
        setType(null)
        setHoliday(null)
        setNationalCuisine(null)
        setSteps([])
        setIngredients([])
    }
}