import { DataSource } from "typeorm";
import { Users } from "./users.entity";
import { DatabaseRepositoryConstants } from "src/constants";

export const usersProviders = [{
    provide: DatabaseRepositoryConstants.usersRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
}]