import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { __AUTH_REDIRECT__, __URL__ } from '../../utils/constants';
import { DiscordAuthGuard } from './auth-guards';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  /**
   * GET /api/auth/discord/login
   * This is the route the user will visit to authenticate with discord
   */
  @Get('/discord/login')
  @UseGuards(DiscordAuthGuard)
  discordLogin() {
    return;
  }

  /**
   * GET /api/auth/default/login
   * This is the route the user will visit to authenticate with default
   */
  @Get('/default/login')
  @UseGuards(DefaultAuthGuard)
  defaultLogin() {
    return;
  }

  /**
   * GET /api/auth/discord/redirect
   * This is the redirect URL the OAuth2 Provider will call for discord
   */
  @Get('/discord/redirect')
  @UseGuards(DiscordAuthGuard)
  discordRedirect(@Res() res: Response) {
    res.redirect(__AUTH_REDIRECT__ as string);
  }

  /**
   * GET /api/auth/default/redirect
   * This is the redirect URL the OAuth2 Provider will call for default
   */
  @Get('/default/redirect')
  @UseGuards(DefaultAuthGuard)
  defaultRedirect(@Res() res: Response) {
    res.redirect(__AUTH_REDIRECT__ as string);
  }

  /**
   * GET /api/auth/providers
   * Retrieve the auth providers
   */
  @Get('providers')
  providers(@Res() res: Response) {
    return res.json({
      providers: [
        {
          id: 'discord',
          name: 'Discord',
          authUrl: `${__URL__}/api/v1/auth/discord/login`,
        },
        {
          id: 'default',
          name: 'Default',
          authUrl: `${__URL__}/api/v1/auth/default/login`,
        },
      ],
    });
  }
}
