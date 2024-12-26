import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PoliciesGuard } from './policies.guard';
import { CaslModule } from 'src/casl/casl.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UsersModule, CaslModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PoliciesGuard]
})
export class AuthModule {}
