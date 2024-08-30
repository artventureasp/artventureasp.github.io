import { Controller, Get, Param, Put, Req } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  getUserById(
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    return this.userService.getUserById(userId, req.user);
  }
  
  @Get(':userId/posts')
  getUserPosts(@Param('userId') userId: string) {
    return this.userService.getUserPosts(userId);
  }

  @Put(':userId/followers')
  toggleFollowing(
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    return this.userService.toggleFollowing(userId, req.user);
  }
}