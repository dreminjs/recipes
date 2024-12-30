import { Type } from "class-transformer";
import { IsBoolean, IsInt } from "class-validator";

export class GetRecipesSelectionQueryParameters {

    @IsBoolean()
    @Type(() => Boolean)
    isType: boolean

    @IsBoolean()
    @Type(() => Boolean)
    isNationalCuisine: boolean

    @IsBoolean()
    @Type(() => Boolean)
    isHoliday: boolean

    @IsInt()
    @Type(() => Number)
    limit: number

    @IsInt()
    @Type(() => Number)
    cursor: number
}