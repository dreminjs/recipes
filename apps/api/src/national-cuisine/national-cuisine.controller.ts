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
import { CreateNationalCuisineDto } from './dtos/create-national-cuisine.dto';
import { NationalCuisine, Roles } from '@prisma/client';
import { UpdateNationalCuisineDto } from './dtos/update-national-cuisine.dto';
import { NationalCuisineService } from './national-cuisine.service';
import { GetCharacteristicsQueryParameters } from '../shared';
import { IItemsPaginationResponse } from 'interfaces';
import { RolesGuard } from '../user/guards/roles.guard';
import { AllowedRoles } from '../user/decorators/roles.decorator';
import { AccessTokenGuard } from '../token';
import { UpdateManyNationalCuisinesDto } from './dtos/update-national-cuisines.dto';

@Controller('national-cuisines')
export class NationalCuisineController {
  constructor(
    private readonly nationalCuisineService: NationalCuisineService
  ) {}

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  public async createOne(
    @Body() body: CreateNationalCuisineDto
  ): Promise<NationalCuisine> {
    return this.nationalCuisineService.createOne(body);
  }

  @Get()
  public async findMany(
    @Query() { title, page, limit }: GetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<NationalCuisine>> {
    const itemsQuery = this.nationalCuisineService.findMany({
      where: {
        ...(title && { title: { contains: title } }),
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const countQuery = this.nationalCuisineService.count({
      where: { ...(title && { title: { contains: title } }) },
    });

    const [items, count] = await Promise.all([itemsQuery, countQuery]);

    return { items: items, countItems: count };
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  public async updateOne(
    @Body() body: UpdateNationalCuisineDto,
    @Param('id') id: string
  ): Promise<NationalCuisine> {
    return await this.nationalCuisineService.updateOne({ id }, { ...body });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put()
  public async updateMany(
    @Body() body: UpdateManyNationalCuisinesDto
  ): Promise<NationalCuisine[]> {
    return await this.nationalCuisineService.updateMany(
      body.updates.map(({ id, title }) => ({ id, data: { title } }))
    );
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(RolesGuard, AccessTokenGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<NationalCuisine> {
    return await this.nationalCuisineService.findOne({ where: { id } });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete()
  public async deleteMany(@Query('id') id: string[] | string): Promise<void> {
    return await this.nationalCuisineService.deleteMany({
      where: { id: { in: id instanceof Array ? [...id] : [id] } },
    });
  }
}
