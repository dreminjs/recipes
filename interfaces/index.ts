import { Step, User } from '@prisma/client';

export type IStep = Pick<Step, 'content'>;

export interface IInfiniteScrollResponse<T> {
  items: T[];
  nextCursor: number | null;
}

export type Characteristics = 'holidays' | 'types' | 'national-cuisines' | 'ingredients'

export interface IItemsPaginationResponse<T> {
  items: T[];
  itemsCount: number;
}

export type IAuthResponse = Omit<User,"hashPassword" | "salt" | "createdAt" | "link">

export interface IStandardResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
}

export interface IRecipeIngredientPayload {
  ingredientId: string
  amount: number
}

export interface IRecipeStepPayload {
  content: string
}

export interface IMessageResponse {
  message: string
}