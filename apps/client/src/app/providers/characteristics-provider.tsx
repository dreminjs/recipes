import { FC, PropsWithChildren } from 'react';
import { store } from '../stores/characteristics.store';
import { Provider } from 'jotai';



export const CharacteristicsProvider: FC<PropsWithChildren> = ({children}) => {
    return (
      <Provider store={store}>{children}</Provider>
    )
}
