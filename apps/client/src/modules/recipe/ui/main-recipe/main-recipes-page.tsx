import { Characteristics } from 'interfaces';
import { Fragment } from 'react';

const characteristics: [Characteristics, Characteristics, Characteristics] = [
  'types',
  'national-cuisines',
  'holidays',
];

export const MainRecipesPage = () => (
  <div>
    {characteristics.map((type, idx) => (
      <Fragment key={idx}>{type}</Fragment>
    ))}
  </div>
);
