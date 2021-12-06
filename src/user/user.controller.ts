import {
  Body,
  Controller,
  Query,
  Request,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/Create-User.dto';
import { JwtAuthGuard } from 'src/auth/gurdes/jwt-guard';
import { RolesGuard } from 'src/auth/gurdes/roles.guard';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { loginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { request } from 'https';
@ApiTags('auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Post('/signup')
  async signUp(@Body() createusertdto: CreateUserDto) {
    const user = await this.userService.createUser(createusertdto);
    return user;
  }
 
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Body() logindto: loginUserDto) {

    return this.authService.generateJwt(req.user)
  }



  //@ApiBearerAuth()
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get admin section' })
  @ApiBearerAuth('JWT-auth')
  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

}
