import { InfiniteData } from '@tanstack/react-query';
import { AdminCharacteristicCell } from '../../../../entities/admin';
import {
  IInfiniteScrollResponse,
  ICharacteristic,
  IItemsPaginationResponse,
} from 'interfaces';
import { FC, useContext, useEffect, useState } from 'react';
import { Prisma, Type } from 'prisma/prisma-client';
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import {
  CharacteristicsContext,
  ICharacteristicsTableCoordinats,
  useGetTypes,
} from 'apps/client/src/shared';


export const AdminCharacteristictsBodyTable: FC = ({}) => {
  const { characteristics, selectedCharacteristics, onSelectCharacteristic } =
    useContext(CharacteristicsContext);

  return (
    <TableBody className=''>
      {characteristics?.items.map((el, idx) => {
        const isChecked = selectedCharacteristics?.some((id) => el.id === id);
        return (
          <TableRow
            hover
            role="checkbox"
            key={el.id}
            sx={{ cursor: 'pointer' }}
            className=''
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={() => onSelectCharacteristic(el.id)}
                checked={isChecked}
                color="primary"
              />
            </TableCell>
            <TableCell>{el.id}</TableCell>
            <AdminCharacteristicCell
              id={el.id}
              cellCoordinates={{ rowIdx: 1, coloumnIdx: idx }}
              type={'text'}
              payload={el.title}
            />
            <AdminCharacteristicCell
              id={el.id}
              cellCoordinates={{ rowIdx: 2, coloumnIdx: idx }}
              type={'checkbox'}
              payload={el.isVisible}
            />
          </TableRow>
        );
      })}
    </TableBody>
  );
};
