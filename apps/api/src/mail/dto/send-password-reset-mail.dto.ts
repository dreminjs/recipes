import { User } from '@prisma/client';

export type ISendPasswordResetMailDto = Pick<User, 'email' | 'nickname'>
