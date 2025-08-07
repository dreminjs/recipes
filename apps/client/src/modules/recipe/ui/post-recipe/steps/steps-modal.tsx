import { BasicModal } from "@/shared"
import { FC } from "react"

interface IProps {
    isOpen: boolean
    onClose: () => void
}

export const StepsModal: FC<IProps> = (props) => {



    return (
        <BasicModal {...props} >

            steps modal
        </BasicModal>
    )
}