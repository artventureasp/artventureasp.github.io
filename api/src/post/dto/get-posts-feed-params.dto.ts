import { IsNumberString } from "class-validator";

export class GetPostsFeedParams {
  @IsNumberString()
  page: number;
}