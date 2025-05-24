import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'tp_jwt',
            username: 'postgres',
            password: 'mipassword',
            synchronize: true,
            entities
        }),
        TypeOrmModule.forFeature(entities),
        UsersModule,
        PermissionsModule,
        RolesModule,
        JwtModule
    ],
    controllers: [AppController, UsersController],
    providers: [AuthGuard, JwtService, UsersService],
})
export class AppModule { }
