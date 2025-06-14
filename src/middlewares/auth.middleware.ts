import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/interfaces/request-user.interface';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { Permissions } from './decorators/permissions.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private reflector: Reflector
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            // Obtiene el token de la request
            // [
            const request: RequestWithUser = context.switchToHttp().getRequest();
            const token = request.headers.authorization.replace('Bearer ', '');
            if (!token) {
                throw new HttpException('Token not found', 401);
            }
            // ]
            //Decodifica el token y obtiene el payload (email) y luego obtiene el usuario
            // [
            const payload = this.jwtService.getPayload(token); //Llama getPayload() donde se usa verify()
            const user = await this.usersService.findByEmail(payload.email);
            if (!user) {
                throw new HttpException('User not found', 401);
            }
            request.user = user;
            // ]
            //Logica de permisos
            // [
            const permissions: string[] = this.reflector.get(Permissions, context.getHandler()); //Obtiene los permisos requeridos del decorador
            const userPermissions: string[] = user.role.permissions.map(p => p.code) || []; //Obtiene los permisos del usuario
            const hasPermission: boolean = permissions.every(p => userPermissions.includes(p)); //Verifica si el usuario tiene todos los permisos requeridos
            if (!hasPermission) {
                throw new HttpException('Unauthorized', 401);
            }
            // ]
            // console.log(permissions)
            return true;
        }
        catch (error) {
            throw new UnauthorizedException(error?.message);
        }
    }
}
