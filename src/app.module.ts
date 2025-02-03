import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,

    }),
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CaslModule,
    RolesModule,
    PermissionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}