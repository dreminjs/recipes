import { useContext } from "react";
import { CharacteristicsContext } from "../../../application/context/characteristics.context";

export const useCharacteristics = () => {
    return useContext(CharacteristicsContext)
}