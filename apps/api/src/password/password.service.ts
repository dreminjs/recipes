import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PasswordService {
    public async hashPassword(password: string, salt: string) : Promise<string> {
        return await bcrypt.hash(password, salt);
      }
    
      public async comparePassword(password: string, hashPassword: string) : Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
      }
}
