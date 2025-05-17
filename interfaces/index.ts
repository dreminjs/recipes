import { Roles, Step, User } from 'prisma/prisma-client';

export type IAuthResponse = {
  message: string
  userId: string
}
export type IStep = Pick<Step, 'content'>;

export interface IInfiniteScrollResponse<T> {
  items: T[];
  nextCursor: number | null;
}

export type Characteristics = 'holidays' | 'types' | 'national-cuisines' | 'ingredients'

export interface IItemsPaginationResponse<T> {
  items: T[];
  currentPage: number;
  countItems: number;
}

export interface IUserResponse {
  nickname: string;
  role: Roles;
  isActived: boolean;
  email: string;
}


export interface IMessageResponse {
  message: string
}