import { DataSource } from "typeorm";
import { Roles } from "./roles.entity";
import { DatabaseRepositoryConstants } from "src/constants";

export const rolesProviders = [{
    provide: DatabaseRepositoryConstants.rolesRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
    inject: ['DATA_SOURCE'],
}]