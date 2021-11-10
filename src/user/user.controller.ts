import {
    Body,
    Controller,
    Query,
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
  import {UserService} from './user.service';
  import{createUserDto} from './dto/create-user.dto'
import { JwtAuthGuard } from 'src/auth/gurdes/jwt-guard';
import { RolesGuard } from 'src/auth/gurdes/roles.guard';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { loginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('/signup')
    async signUp(@Body() createusertdto: createUserDto){
      const generateId =  await this.userService.createUser(createusertdto);
      return { id: generateId };
    }

    @Post('/login')
  async login(@Body() logindto: loginUserDto) {
    const user = await this.userService.login(logindto);
      return user;
    }
    
   
    
    
    //@ApiBearerAuth()
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiTags('admin')
    @ApiOperation({ summary: 'Get admin section' })
    @ApiBearerAuth('JWT-auth')
    @Get()
    async getUsers(){
      const users = await this.userService.getUsers();
    return users ;
    }

}
