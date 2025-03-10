/*
  Warnings:

  - The primary key for the `agendamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_agendamento` on the `agendamento` table. All the data in the column will be lost.
  - The primary key for the `auditoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_auditoria` on the `auditoria` table. All the data in the column will be lost.
  - The primary key for the `historico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_historico` on the `historico` table. All the data in the column will be lost.
  - Added the required column `id` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Auditoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `historico` DROP FOREIGN KEY `Historico_id_agendamento_fkey`;

-- DropIndex
DROP INDEX `Historico_id_agendamento_fkey` ON `historico`;

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
ALTER TABLE `historico` DROP PRIMARY KEY,
    DROP COLUMN `id_historico`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_id_agendamento_fkey` FOREIGN KEY (`id_agendamento`) REFERENCES `Agendamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
