import { MigrationInterface, QueryRunner } from "typeorm";

export class IntegrateCode1722999541895 implements MigrationInterface {
    name = 'IntegrateCode1722999541895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "codeVerification" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "codeVerification"`);
    }

}
