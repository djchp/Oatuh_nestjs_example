import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('OAUTH_GITHUB_ID'),
      clientSecret: configService.get<string>('OAUTH_GITHUB_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GITHUB_REDIRECT_URL'),
      scope: ['public_profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, displayName, username } = profile;

    let user = await this.usersService.findOne({
      where: { provider: 'github', providerId: id },
    });
    console.log(profile);
    if (!user) {
      user = await this.usersService.create({
        provider: 'github',
        providerId: id,
        name: displayName,
        username,
      });
    }

    return user;
  }
}
