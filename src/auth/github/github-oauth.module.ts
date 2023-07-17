import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { JwtAuthModule } from '../jwt/jwt.module';
import { GithubOauthStrategy } from './github.strategy';
import { GithubOauthController } from './github.controller';

@Module({
  imports: [JwtAuthModule, UsersModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
