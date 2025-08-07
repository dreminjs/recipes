import { TabPanel, TabContext } from "@mui/lab";
import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export type IProps = { 
    parentNumber: string,
    currentNumber: string
} & PropsWithChildren

export const TabsLayout:FC<IProps> = ({parentNumber,currentNumber,children}) => {
  return (
    <TabPanel value={parentNumber}>
      <TabContext value={currentNumber}>
        <Box sx={{ height: '400px' }}>
            {children}
        </Box>
      </TabContext>
    </TabPanel>
  );
};