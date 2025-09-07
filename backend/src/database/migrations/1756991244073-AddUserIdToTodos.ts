import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToTodos1756991244073 implements MigrationInterface {
  name = 'AddUserIdToTodos1756991244073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add userId column to todos table
    await queryRunner.query(
      `ALTER TABLE \`todos\` ADD \`userId\` varchar(36) NOT NULL`,
    );

    // Add foreign key constraint
    await queryRunner.query(
      `ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_5d3f0483b0fdd2b4df6b34e4f3a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key constraint
    await queryRunner.query(
      `ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_5d3f0483b0fdd2b4df6b34e4f3a\``,
    );

    // Remove userId column
    await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`userId\``);
  }
}

