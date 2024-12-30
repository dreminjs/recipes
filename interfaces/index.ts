import { Step, User } from 'prisma/prisma-client';

export type IAuthResponse = Omit<
  User,
  'hashPassword' | 'salt' | 'id' | 'link' | 'role'
>;

export type IRecipeIngredient = {
  id: string;
  ingredientId: string;
};

export type IStep = Pick<Step, 'content'>;

export interface InfiniteScrollResponse<T> {
  data: T[];
  nextCursor: number | null;
}

export type characteristics = 'holiday' | 'type' | 'national-cuisine';

export interface ICharacteristic {
  id: string;
  title: string;
  type: characteristics;
}
