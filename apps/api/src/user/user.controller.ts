import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("role")
    public async findUserRole(){
        return await this.userService.findOne({ role: "USER" });
    }

    @Get(":id")
    public async findOne(@Query("id") id: string){
        return await this.userService.findOne({ id });
    }


}
