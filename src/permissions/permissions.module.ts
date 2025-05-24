import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permissions.entity';
import { JwtModule } from 'src/jwt/jwt.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PermissionEntity
        ]),
        JwtModule,
        UsersModule
    ],
    controllers: [PermissionsController],
    providers: [PermissionsService],
})
export class PermissionsModule { }
