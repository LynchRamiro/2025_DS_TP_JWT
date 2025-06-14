import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Permissions(['role_create'])
    @Post('create')
    createRole(@Body('name') name: string) {
        return this.rolesService.createRole(name);
    }

    @Permissions(['role_get_all'])
    @Get()
    getAllRoles() {
        return this.rolesService.getAllRoles();
    }
}
