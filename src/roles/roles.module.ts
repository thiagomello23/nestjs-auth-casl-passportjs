import { Module } from "@nestjs/common";
import { rolesProviders } from "./roles.providers";

@Module({
    providers: [...rolesProviders],
    exports: [...rolesProviders]
})
export class RolesModule {}