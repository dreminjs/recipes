import { User } from 'prisma/prisma-client';

export type IAuthResponse = Omit<User, 'hashPassword' | 'salt' | 'id'>;
