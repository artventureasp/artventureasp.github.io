import { Type } from "class-transformer";
import { IsBooleanString, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class NewPostOptionsDto {
  @IsBooleanString()
  commentsOn: boolean;

  @IsBooleanString()
  public: boolean;
}

export class NewPostDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  mood: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => NewPostOptionsDto)
  options?: NewPostOptionsDto;
}