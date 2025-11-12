import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => {
    return {
      secret: process.env.JWT_SECRET_KEY || 'secret-key',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '2h') as any,
      }
    };
  }
)