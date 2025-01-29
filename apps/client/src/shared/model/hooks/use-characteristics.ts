import { useContext } from "react";
import { CharacteristicsContext } from "../context/characteristics.context";

export const useCharacteristics = () => {
    return useContext(CharacteristicsContext)
}