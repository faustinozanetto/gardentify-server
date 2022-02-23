import { Injectable, Inject } from '@nestjs/common';
import { Strategy, Profile } from 'passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { __GITHUB_CALLBACK__ } from '../../../utils/constants';
import { AuthProvider } from '../../users/models/user.model';
import { AuthenticationProvider, UserDetails } from '../auth';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: __GITHUB_CALLBACK__,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const details: UserDetails = {
      username: profile.displayName,
      oauthId: profile.id,
      authProvider: AuthProvider.GITHUB,
      avatar: profile.photos[0].value,
      accessToken: accessToken ?? '',
      refreshToken: refreshToken ?? '',
    };
    return this.authService.validateUser(details);
  }
}
