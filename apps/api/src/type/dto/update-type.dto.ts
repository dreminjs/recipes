import { CreateTypeDto } from "./create-type.dto";
import { PartialType } from "@nestjs/mapped-types";


export class UpdateTypeDto extends PartialType(CreateTypeDto) {}