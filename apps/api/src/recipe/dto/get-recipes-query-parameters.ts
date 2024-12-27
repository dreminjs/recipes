import { Transform } from "class-transformer"


export class GetRecipesQueryParameters {

    nationalCuisineId?: string

    typeId?: string

    holidayId?: string

    title: string

    @Transform(({ value }) => parseInt(value, 10))
    cursor: number

    @Transform(({ value }) => parseInt(value, 10))
    take: number

}