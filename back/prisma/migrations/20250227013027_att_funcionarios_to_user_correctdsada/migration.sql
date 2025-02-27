/*
  Warnings:

  - Made the column `refreshToken` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `conselho` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `especialidade` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registro` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `refreshToken` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `conselho` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `especialidade` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `registro` VARCHAR(191) NOT NULL DEFAULT '';
