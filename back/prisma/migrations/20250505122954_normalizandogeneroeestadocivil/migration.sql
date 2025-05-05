/*
  Warnings:

  - You are about to alter the column `sexo` on the `paciente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(4))`.
  - You are about to alter the column `estado_civil` on the `paciente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `paciente` MODIFY `sexo` ENUM('M', 'F', 'O') NOT NULL,
    MODIFY `estado_civil` ENUM('S', 'C', 'D', 'V') NOT NULL;
