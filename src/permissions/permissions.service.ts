import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entities/permissions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionEntity)
        private permissionRepo: Repository<PermissionEntity>,
    ) {}

    async createPermission(permissionCode: string) {
        const permission = this.permissionRepo.create({ code: permissionCode });
        await this.permissionRepo.save(permission);
        return {'status':'created'};
    }

    async getAllPermissions() {
        return this.permissionRepo.find();
    }
}
