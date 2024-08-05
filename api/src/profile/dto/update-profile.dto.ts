import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class UpdateProfileSettingsDto {
  @IsBoolean()
  @IsOptional()
  postsHidden?: boolean;
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileSettingsDto)
  settings?: UpdateProfileSettingsDto;
}