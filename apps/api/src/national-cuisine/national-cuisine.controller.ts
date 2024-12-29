import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNationalCuisineDto } from './dtos/create-national-cuisine.dto';
import { NationalCuisine } from '@prisma/client';
import { UpdateNationalCuisineDto } from './dtos/update-national-cuisine.dto';
import { NationalCuisineService } from './national-cuisine.service';

@Controller('national-cuisine')
export class NationalCuisineController {
  constructor(
    private readonly nationalCuisineService: NationalCuisineService
  ) {}

  @Post()
  public async createOne(
    @Body() body: CreateNationalCuisineDto
  ): Promise<NationalCuisine> {
    return this.nationalCuisineService.createOne(body);
  }

  @Get()
  public async findMany(): Promise<NationalCuisine[]> {
    return await this.nationalCuisineService.findMany();
  }

  @Put(':id')
  public async updateOne(
    @Body() body: UpdateNationalCuisineDto,
    @Param('id') id: string
  ): Promise<NationalCuisine> {
    return await this.nationalCuisineService.updateOne(body, { id });
  }

  @Get(":id")
  public async findOne(@Param('id') id: string): Promise<NationalCuisine> {
    return await this.nationalCuisineService.findOne({ id });
  }
}
