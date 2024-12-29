import { DataSource } from "typeorm";
import { DatabaseRepositoryConstants } from "src/constants";
import { Permissions } from "./permissions.entity";

export const permissionsProviders = [{
    provide: DatabaseRepositoryConstants.permissionsRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Permissions),
    inject: ['DATA_SOURCE'],
}]