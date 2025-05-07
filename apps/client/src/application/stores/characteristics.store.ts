import { ICharacteristicsTableCoordinats, ICharacteristicPayload } from "@/shared*";
import { atom, createStore } from "jotai";
import { ICharacteristic, UpdateCharacteristicDto } from "src/shared/model/interfaces/characteristic.interface";

export const store = createStore()

export const limitAtom = atom(0)

export const characteristicsAtom = atom<ICharacteristic[]>([])

export const selectedCharacteristicsIdsAtom = atom<string[]>([])
 
export const isHeadCheckboxCheckedAtom = atom(false)

export const isPostCharacteristicModalVisibleAtom = atom(false)

export const activeCellAtom = atom<ICharacteristicsTableCoordinats | null>(null)

export const updatedCharacteristicsAtom = atom<ICharacteristicPayload[]>([])

export const newCharacteristicAtom = atom<UpdateCharacteristicDto | null>(null)

store.set(limitAtom,0)
store.set(characteristicsAtom,[])
store.set(selectedCharacteristicsIdsAtom,[])
store.set(isHeadCheckboxCheckedAtom, false)
store.set(isPostCharacteristicModalVisibleAtom,false)
store.set(activeCellAtom, null)
store.set(updatedCharacteristicsAtom,[])
store.set(newCharacteristicAtom, null)