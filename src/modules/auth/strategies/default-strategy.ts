import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationProvider, UserDetails } from '../auth';
import { __DISCORD_CALLBACK__ } from '../../../utils/constants';
import { AuthProvider } from '../../users/models/user.model';

@Injectable()
export class DefaultStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: __DISCORD_CALLBACK__,
      scope: ['identify'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, id, avatar } = profile;
    const details: UserDetails = {
      username,
      authProvider: AuthProvider.DISCORD,
      oauthId: id,
      avatar,
      accessToken,
      refreshToken,
    };
    return this.authService.validateUser(details);
  }
}
