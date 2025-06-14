import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { AuthGuard } from '../middlewares/auth.middleware';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}

    @Permissions(['permission_create'])
    @Post('create')
    createPermission(@Body('code') code: string) {
        return this.permissionsService.createPermission(code);
    }

    @Permissions(['permission_get_all'])
    @Get()
    getAllPermissions() {
        return this.permissionsService.getAllPermissions();
    }
}
