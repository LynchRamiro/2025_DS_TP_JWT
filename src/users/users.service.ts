import {
    HttpException,
    Injectable,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
    repository = UserEntity;
    constructor(private jwtService: JwtService) { }

    async refreshToken(refreshToken: string) {
        return this.jwtService.refreshToken(refreshToken);
    }

    canDo(user: UserI, permission: string): boolean {
        const result = user.role.getPermissionCodes().includes(permission);
        if (!result) {
            throw new HttpException(
                'User does not have permission to do this action',
                403,
            );
        }
        return true;
    }

    async register(registerBody: RegisterDTO) {
        const userExists = await this.repository.findOneBy({
            email: registerBody.email,
        });
        if (userExists) {
            throw new HttpException('User already exists', 400);
        }
        const user = this.repository.create({
            email: registerBody.email,
            password: registerBody.password,
        });

        user.password = hashSync(user.password, 10);

        await this.repository.save(user);

        return { status: 'created' };
    }

    async login(loginBody: LoginDTO) {
        const user = await this.repository.findOne({ where: { email: loginBody.email } });
        if (user == null) {
            throw new HttpException('User not found', 404);
        }
        const compareResult = compareSync(loginBody.password, user.password);
        if (!compareResult) {
            throw new HttpException('Invalid password', 401);
        }
        return {
            accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
            refreshToken: this.jwtService.generateToken(
                { email: user.email },
                'refresh',
            )
        };
    }
    async findByEmail(email: string): Promise<UserEntity> {
        return await this.repository.findOne({
            where: { email },
            relations: ['role', 'role.permissions'], // 👈 importante
        });
    }
}
