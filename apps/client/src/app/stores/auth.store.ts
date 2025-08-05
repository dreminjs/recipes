import { User } from "@prisma/client";
import { atom } from "jotai";




export const currentUserAtom = atom<User | null>(null)