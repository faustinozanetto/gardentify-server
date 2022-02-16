import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DiscordStrategy } from './strategies/discord-strategy';

@Module({
  controllers: [AuthController],
  providers: [
    DiscordStrategy,
    DefaultStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  exports: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  imports: [],
})
export class AuthModule {}
