import { User } from '@prisma/client';

export interface ISendPasswordResetMailDto {
  user: Pick<User, 'email' | 'nickname'>;
}
