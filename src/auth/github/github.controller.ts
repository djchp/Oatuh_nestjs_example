import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GithubOauthGuard } from './github.oauth.guard';
import { JwtAuthService } from '../jwt/jwt.service';

@Controller('auth/github')
export class GithubOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('redirect')
  @UseGuards(GithubOauthGuard)
  async githubAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('session', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    res.cookie('jwt', accessToken);
    return { access_token: accessToken };
  }
}
