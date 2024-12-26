import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashPasswordResponse } from './password.interface';

@Injectable()
export class PasswordService {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async generateHashPassword(password: string): Promise<IHashPasswordResponse> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await this.hashPassword(password, salt);

    return {
      salt,
      hashPassword,
    };
  }
}
