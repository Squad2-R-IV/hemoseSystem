/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contato` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `conselho` VARCHAR(191) NULL,
    ADD COLUMN `contato` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `especialidade` VARCHAR(191) NULL,
    ADD COLUMN `registro` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'A';

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);
