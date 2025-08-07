import { BasicModal } from "@/shared"
import { FC } from "react"
import { InputStep } from "./input-step"

interface IProps {
    isOpen: boolean
    onClose: () => void
}

export const StepsModal: FC<IProps> = (props) => {

    return (
        <BasicModal {...props} >
            <InputStep />
        </BasicModal>
    )
}