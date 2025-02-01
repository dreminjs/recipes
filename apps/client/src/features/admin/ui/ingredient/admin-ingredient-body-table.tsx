import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import { Ingredient } from 'prisma/prisma-client';
import { FC } from 'react';

interface IProps {
  items: Ingredient[];
  selectedItems: string[];

  onSelectItemId: (id: string) => void;
}

export const AdminIngredientBodyTable: FC<IProps> = ({
  items,
  selectedItems,
  onSelectItemId,
}) => {
  
  return (
    <TableBody>
      {items.map((item) => {
        const isChecked = selectedItems.some((id) => item.id === id);

        return (
          <TableRow key={item.id}>
            <TableCell>
              <Checkbox
                onClick={() => onSelectItemId(item.id)}
                checked={isChecked}
                color="primary"
              />
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.measure}</TableCell>
            <TableCell>{item.title}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
