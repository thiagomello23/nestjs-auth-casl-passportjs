import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { UsersModule } from "src/users/users.module";
import { RolesModule } from "src/roles/roles.module";
import { PermissionsModule } from "src/permissions/permissions.module";

@Module({
    imports: [UsersModule, RolesModule, PermissionsModule],
    providers: [SeedService],
    exports: [SeedService]
})
export class SeedModule{}