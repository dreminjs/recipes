import { TabPanel } from "@mui/lab"
import { IngredietsList } from "./ingredients-list"

export const ChooseIngredientsTab = () => {

    return (
        <TabPanel value="0">
            <IngredietsList />
        </TabPanel>
    )
}