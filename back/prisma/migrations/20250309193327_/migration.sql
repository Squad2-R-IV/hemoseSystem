/*
  Warnings:

  - You are about to drop the column `data_agendamento` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `hora_agendamento` on the `agendamento` table. All the data in the column will be lost.
  - Added the required column `data_hora_agendamento` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `agendamento` DROP COLUMN `data_agendamento`,
    DROP COLUMN `hora_agendamento`,
    ADD COLUMN `data_hora_agendamento` DATETIME(3) NOT NULL;
