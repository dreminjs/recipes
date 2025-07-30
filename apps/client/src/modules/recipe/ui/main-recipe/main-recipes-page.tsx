import { Characteristics } from '@/interfaces';

const characteristics: [Characteristics, Characteristics, Characteristics] = [
  'types',
  'national-cuisines',
  'holidays',
];

export const MainRecipesPage = () => (
  <div>
    {characteristics.map((type, idx) => (
      <>{type}</>
    ))}
  </div>
);
