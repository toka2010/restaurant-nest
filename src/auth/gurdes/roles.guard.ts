import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map,pipe  } from 'rxjs';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
    ) {
}

canActivate( context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //console.log("🚀 ~ file: roles.guard.ts ~ line 17 ~ RolesGuard ~ canActivate ~ roles", roles[0]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
  
    
    const user:User = request.user;
    console.log("🚀 ~ file: roles.guard.ts ~ line 25 ~ RolesGuard ~ canActivate ~ user", user)
    
   if(roles.includes(user.role)){

    return true;
   }
   return false;

    
  }
}
