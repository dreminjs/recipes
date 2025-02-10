import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Holiday, Roles } from '@prisma/client';
import { HolidayService } from './holiday.service';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { GetCharacteristicsQueryParameters } from '../shared';
import { IItemsPaginationResponse } from 'interfaces';
import { AccessTokenGuard } from '../token';
import { AllowedRoles } from '../user/decorators/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { CreateHolidayDto } from './dto/create-holiday.dto';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get()
  public async findMany(
    @Query() { title, page, limit }: GetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<Holiday>> {

    const itemsQuery = this.holidayService.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...(title && { title: { contains: title } }),
      },
    })

    const countQuery = this.holidayService.count({where: {
      ...(title && { title: { contains: title } }),
    },})

    const [items, count] = await Promise.all([
      itemsQuery,
      countQuery,
    ]);
    return {
      items,
      currentPage: page,
      countItems: count,
    };
  }
  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  public async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateHolidayDto
  ): Promise<Holiday> {
    return await this.holidayService.updateOne({ id }, body);
  }
  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  public async createOne(@Body() body: CreateHolidayDto): Promise<Holiday> {
    return await this.holidayService.createOne(body);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Holiday> {
    return await this.holidayService.findOne({ where: { id } });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete()
  public async deleteMany(@Query('id') id: string[] | string): Promise<void> {
    return await this.holidayService.deleteMany({
      where: { id: { in: id instanceof Array ? [...id] : [id] } },
    });
  }
}
