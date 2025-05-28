/*
  Warnings:

  - You are about to drop the column `observacoes` on the `alta_medica` table. All the data in the column will be lost.
  - Added the required column `relatorio` to the `alta_medica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alta_medica` DROP COLUMN `observacoes`,
    ADD COLUMN `relatorio` TEXT NOT NULL;
