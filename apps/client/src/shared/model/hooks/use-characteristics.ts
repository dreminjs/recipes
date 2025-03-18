import { useContext } from "react";
import { CharacteristicsContext } from '@/application'

export const useCharacteristics = () => {
    return useContext(CharacteristicsContext)
}