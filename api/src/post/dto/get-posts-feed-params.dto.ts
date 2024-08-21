import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetPostsFeedParams {
  @IsNumberString()
  page: number;

  @IsString()
  @IsOptional()
  filter: string;
}