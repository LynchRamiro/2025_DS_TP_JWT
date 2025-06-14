import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepo: Repository<RoleEntity>,
    ) {}
    async createRole(roleName: string) {
        const role = this.roleRepo.create({ name: roleName });
        await this.roleRepo.save(role);
        return {'status':'created'};
    }
    async getAllRoles() {
        return this.roleRepo.find();
    }
}
