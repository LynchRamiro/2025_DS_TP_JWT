import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as dayjs from 'dayjs';
import { Payload } from 'src/interfaces/payload.interface';

@Injectable()
export class JwtService {
    // config.ts
    // [
    config = {
        auth: {
            secret: 'authSecret',
            expiresIn: '15m',
        },
        refresh: {
            secret: 'refreshSecret',
            expiresIn: '1d',
        },
    };
    // ]

    // genera el token de acceso o de refresh
    // [
    generateToken(
        payload: { email: string },
        type: 'refresh' | 'auth' = 'auth',
    ): string {
        return sign(payload, this.config[type].secret, {
            expiresIn: this.config[type].expiresIn,
        });
    }
    // ]

    // re-genera un token de acceso (y un token de refresh de ser necesario)
    // [
    refreshToken(refreshToken: string): { accessToken: string, refreshToken: string } {
        try {
            const payload = this.getPayload(refreshToken, 'refresh')
            // Obtiene el tiempo restante en minutos hasta la expiración
            const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');
            return {
                accessToken: this.generateToken({ email: payload.email }),
                refreshToken:
                    timeToExpire < 20
                        ? this.generateToken({ email: payload.email }, 'refresh')
                        : refreshToken
            };
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
    // ]

    // verifica el token y obtiene el payload desencriptado
    // [
    getPayload(token: string, type: 'refresh' | 'auth' = 'auth'): Payload {
        const decoded = verify(token, this.config[type].secret);

        if (typeof decoded === 'string') {
            throw new HttpException('Invalid token', 401);
        }

        return decoded as Payload;
    }
    // ]
}
