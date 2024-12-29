import { Module } from "@nestjs/common";
import { permissionsProviders } from "./permissions.providers";

@Module({
    providers: [...permissionsProviders],
    exports: [...permissionsProviders]
})
export class PermissionsModule{}