/*
  Warnings:

  - You are about to alter the column `dados_anteriores` on the `auditoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `dados_novos` on the `auditoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `auditoria` MODIFY `dados_anteriores` JSON NULL,
    MODIFY `dados_novos` JSON NULL;
