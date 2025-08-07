import z from "zod";
import { StepFormSchema } from "../schemas/step.schema"

export type ICreateStepFormDto = z.infer<typeof StepFormSchema>