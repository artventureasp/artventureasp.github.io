import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }
  
  @Get(':userId/posts')
  getUserPosts(@Param('userId') userId: string) {
    return this.userService.getUserPosts(userId);
  }
}