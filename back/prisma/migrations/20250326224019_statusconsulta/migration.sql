/*
  Warnings:

  - You are about to alter the column `status` on the `consulta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `consulta` MODIFY `status` ENUM('REALIZADA', 'AGUARDANDO', 'EM_ATENDIMENTO') NOT NULL DEFAULT 'AGUARDANDO';
