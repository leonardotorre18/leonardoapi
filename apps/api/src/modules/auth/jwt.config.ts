import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private config: ConfigService) { }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.getOrThrow<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.config.getOrThrow<any>('jwt.signOptions.expiresIn'),
      },
    }
  }
}