/*
  Warnings:

  - You are about to alter the column `tipo_do_exame` on the `exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to alter the column `status` on the `exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `exame` MODIFY `tipo_do_exame` ENUM('SANGUE', 'URINA', 'FEZES', 'IMAGEM', 'ENDOSCOPICO', 'OUTRO') NOT NULL,
    MODIFY `status` ENUM('PENDENTE', 'REALIZADO') NOT NULL;
