import { IsString } from "class-validator";

export class PostReactionDto {
  @IsString()
  reaction: string;
}