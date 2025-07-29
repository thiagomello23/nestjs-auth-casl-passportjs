import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthTables11 implements MigrationInterface {
    name = 'CreateAuthTables11753795033905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."permissions_action_enum" AS ENUM('manage', 'create', 'read', 'update', 'delete')`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "action" "public"."permissions_action_enum" NOT NULL, "subject" character varying NOT NULL, "conditions" json, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."roles_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "public"."roles_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions_roles_roles" ("permissionsId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_4a0eb2f30d7d81ba1069abaa94d" PRIMARY KEY ("permissionsId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aff2f66944175a2cb34cfa8a50" ON "permissions_roles_roles" ("permissionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b746e554e30a7c6027aab29cda" ON "permissions_roles_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "roles_users_users" ("rolesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_d9b9cca39b8cc7e99072274dafa" PRIMARY KEY ("rolesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6baa1fce24dde516186c4f0269" ON "roles_users_users" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_391282056f6da8665b38480a13" ON "roles_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" ADD CONSTRAINT "FK_aff2f66944175a2cb34cfa8a503" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" ADD CONSTRAINT "FK_b746e554e30a7c6027aab29cda6" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" ADD CONSTRAINT "FK_6baa1fce24dde516186c4f0269a" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" ADD CONSTRAINT "FK_391282056f6da8665b38480a131" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_users_users" DROP CONSTRAINT "FK_391282056f6da8665b38480a131"`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" DROP CONSTRAINT "FK_6baa1fce24dde516186c4f0269a"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" DROP CONSTRAINT "FK_b746e554e30a7c6027aab29cda6"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" DROP CONSTRAINT "FK_aff2f66944175a2cb34cfa8a503"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_391282056f6da8665b38480a13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6baa1fce24dde516186c4f0269"`);
        await queryRunner.query(`DROP TABLE "roles_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b746e554e30a7c6027aab29cda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aff2f66944175a2cb34cfa8a50"`);
        await queryRunner.query(`DROP TABLE "permissions_roles_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_role_enum"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TYPE "public"."permissions_action_enum"`);
    }

}
