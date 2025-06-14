import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { AuthGuard } from '../middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { Permissions } from '../middlewares/decorators/permissions.decorator';

@Controller('')
export class UsersController {
    constructor(private service: UsersService) { }

    @UseGuards(AuthGuard)
    @Permissions(['user_get_me'])
    @Get('me')
    me(@Req() req: RequestWithUser) {
        return {
            email: req.user.email,
        };
    }

    @Post('login')
    login(@Body() loginBody: LoginDTO) {
        return this.service.login(loginBody);
    }

    @Post('register')
    register(@Body() registerBody: RegisterDTO) {
        return this.service.register(registerBody);
    }

    @UseGuards(AuthGuard)
    @Permissions(['user_get_permissions'])
    @Get('can-do/:permission')
    canDo(
        @Req() request: RequestWithUser,
        @Param('permission') permission: string,
    ) {
        return this.service.canDo(request.user, permission);
    }

    @Get('refresh-token')
    refreshToken(@Req() request: Request) {
        return this.service.refreshToken(
            request.headers['refresh-token'] as string,
        );
    }
}
