/*
  Warnings:

  - The primary key for the `agendamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_agendamento` on the `agendamento` table. All the data in the column will be lost.
  - The primary key for the `auditoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_auditoria` on the `auditoria` table. All the data in the column will be lost.
  - The primary key for the `consulta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_consulta` on the `consulta` table. All the data in the column will be lost.
  - Added the required column `id` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Auditoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `consulta` DROP FOREIGN KEY `Consulta_id_agendamento_fkey`;

-- DropIndex
DROP INDEX `Consulta_id_agendamento_fkey` ON `consulta`;

-- AlterTable
ALTER TABLE `agendamento` DROP PRIMARY KEY,
    DROP COLUMN `id_agendamento`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `auditoria` DROP PRIMARY KEY,
    DROP COLUMN `id_auditoria`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `consulta` DROP PRIMARY KEY,
    DROP COLUMN `id_consulta`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_id_agendamento_fkey` FOREIGN KEY (`id_agendamento`) REFERENCES `Agendamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
