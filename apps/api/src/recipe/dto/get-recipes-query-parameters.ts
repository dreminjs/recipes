import { Transform } from "class-transformer"


export class GetRecipesQueryParameters {

    nationalCuisineIds?: string[] | string

    typeIds?: string[] | string

    holidayIds?: string[] | string

    title: string

    @Transform(({ value }) => parseInt(value, 10))
    skip: number

    @Transform(({ value }) => parseInt(value, 10))
    take: number

}