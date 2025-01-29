import { Roles, Step, User } from 'prisma/prisma-client';

export type IAuthResponse = Omit<
  User,
  'hashPassword' | 'salt' | 'id' | 'link' | 'role' | "createdAt"
>;

export type IStep = Pick<Step, 'content'>;

export interface IInfiniteScrollResponse<T> {
  data: T[];
  nextCursor: number | null;
}

export type characteristics = 'holiday' | 'type' | 'national-cuisine';

export interface ICharacteristic {
  id: string;
  title: string;
  type: characteristics;
  isVisible: boolean;
}

export interface IItemsPaginationResponse<T> {
  items: T[]
  currentPage: number 
  countItems: number | null;
}

export interface IUserResponse {
  nickname: string
  role: Roles
  isActived: boolean
  email: string
}