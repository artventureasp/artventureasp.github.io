import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class NewPostOptionsDto {
  @IsBoolean()
  commentsOn: boolean;

  @IsBoolean()
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