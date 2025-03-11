/*
  Warnings:

  - The primary key for the `paciente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_paciente` on the `paciente` table. All the data in the column will be lost.
  - Added the required column `id` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_id_paciente_fkey`;

-- DropIndex
DROP INDEX `Agendamento_id_paciente_fkey` ON `agendamento`;

-- AlterTable
ALTER TABLE `paciente` DROP PRIMARY KEY,
    DROP COLUMN `id_paciente`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_paciente_fkey` FOREIGN KEY (`id_paciente`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
